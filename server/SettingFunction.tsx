import { authenticate } from "./AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "./Constant";
import { getFileJsonData, overWriteData, readFile } from "./FileFunction";
import { checkUpdAuth } from "./MasterDataFunction";
import { authInfoType, customAttributeListType, customAttributeType, searchConditionType, taskListType } from "./Type/type";
import { getNowDate } from "./CommonFunction";


//カスタム属性ファイルのパス
const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;
//カスタム属性IDの接頭辞
const PRE_CUSTOMATTRIBUTE_ID = `ATTRIBUTEID-`;
//カスタム属性リストIDの接頭辞
const PRE_CUSTOMATTRIBUTELIST_ID = `ATTRIBUTELISTID-`;

//カスタム属性の選択リストの登録メソッドの戻り値
type registSelectListRetType = {
    errMsg: string,
    registSelectList: customAttributeListType[]
}


/**
 * カスタム属性の取得
 */
export function getCustomAttribute(res: any, req: any, id?: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //パスパラメータの指定あり
    if (id) {
        let singleCustomAttributeData = decodeFileData.find((element) => { return element.id === id });
        if (!singleCustomAttributeData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
        }

        //選択リストを所持している場合は結合する
        if (singleCustomAttributeData.selectElementListId) {
            //カスタム属性リストファイルの読み込み
            let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
            //選択リストのIDで絞り込み
            let filterdCalDate = calDecodeFileData
                .filter((element) => { return element.id === singleCustomAttributeData?.selectElementListId })
                .map((element) => { return element.content });

            singleCustomAttributeData.selectElementList = filterdCalDate
        }

        return res.status(200).json(singleCustomAttributeData);
    }

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}


/**
 * カスタム属性の追加
 */
export function runAddCustomAttribute(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //カスタム属性の登録用データの作成
    let caRegistData = createAddCustomAttribute(caDecodeFileData, req, authResult);

    let calRegistData: registSelectListRetType = {
        errMsg: "",
        registSelectList: []
    };

    //カスタム属性リストのIDが存在する場合はリストを登録する
    let registListFlg: boolean = req.body.selectElementList && req.body.selectElementList.length > 0;
    if (registListFlg) {
        //カスタム属性リストファイルの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        //登録データ
        let tmp: customAttributeType = caRegistData[caRegistData.length - 1];

        //カスタム属性リストの登録用データの作成
        calRegistData = createAddCustomAttributeList(calDecodeFileData, req, tmp, authResult);

        //IDの整合性エラー
        if (calRegistData.errMsg) {
            return res
                .status(500)
                .json({ errMsg: calRegistData.errMsg });
        }
    }

    //データを登録
    let errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(caRegistData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //カスタム属性リストを登録
    if (registListFlg) {
        //データを登録
        errMessage = overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(calRegistData.registSelectList, null, '\t'));

        //登録に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * カスタム属性の登録用データの作成
 * @param fileDataObj 読み込んだデータ
 * @param req リクエスト
 * @param authResult ユーザー情報
 * @returns 
 */
function createAddCustomAttribute(fileDataObj: customAttributeType[], req: any, authResult: authInfoType)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let registData: customAttributeType = {
        id: "",
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: "",
        name: "",
        format: "",
        required: false,
        selectElementListId: "",
        selectElementList: [],
    };

    //登録データをセット
    registData = { ...req.body };
    delete registData.selectElementList;
    registData.selectElementListId = "";
    registData.registerTime = nowDate;
    registData.updTime = nowDate;
    registData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    registData.deleteFlg = "0";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTE_ID}`, "");
    //新しいIDを割り当てる
    registData.id = `${PRE_CUSTOMATTRIBUTE_ID}${parseInt(id) + 1}`;

    //選択リストが存在する場合IDを取得
    if (req.body.selectElementList && req.body.selectElementList.length > 0) {
        //カスタム属性リストの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        let len = calDecodeFileData.length;
        //IDを取得
        let tmp = len === 0 ? "0" : calDecodeFileData[len - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTELIST_ID}`, "");
        let newId = `${PRE_CUSTOMATTRIBUTELIST_ID}${parseInt(tmp) + 1}`;
        //選択リストIDをセット
        registData.selectElementListId = newId;
    }

    fileDataObj.push(registData);

    return fileDataObj;
}

/**
 * カスタム属性リストの登録用データの作成
 * @param fileDataObj 読み込んだカスタム属性リスト
 * @param req リクエスト
 * @param caData カスタム属性の登録用データ
 * @param authResult ユーザー情報
 * @returns 
 */
function createAddCustomAttributeList(
    fileDataObj: customAttributeListType[], req: any, caData: customAttributeType, authResult: authInfoType)
    : registSelectListRetType {

    let ret: registSelectListRetType = {
        errMsg: "",
        registSelectList: fileDataObj
    };

    //選択リスト
    let selectList = req.body.selectElementList;

    //選択リストが存在しない
    if (!selectList || selectList.length === 0) {
        return ret;
    }

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "0" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTELIST_ID}`, "");
    let newId = `${PRE_CUSTOMATTRIBUTELIST_ID}${parseInt(id) + 1}`;

    //IDの整合性チェック
    if (newId !== caData.selectElementListId) {
        ret.errMsg = "選択リストの登録に失敗しました";
        return ret;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    //データを登録用リストにセット
    for (let i = 0; i < selectList.length; i++) {
        //登録データ
        let body: customAttributeListType = {
            id: newId,
            no: (i + 1).toString(),
            content: selectList[i],
            registerTime: nowDate,
            updTime: nowDate,
            userId: authResult.userInfo ? authResult.userInfo?.userId : "",
            deleteFlg: "0",
        };

        fileDataObj.push(body);
    }

    ret.registSelectList = fileDataObj;
    return ret;
}


/**
 * カスタム属性の削除
 */
export function runDeleteCustomAttribute(res: any, req: any, caId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!caId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData = caDecodeFileData.find((element) => {
        return element.id === caId;
    });

    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `削除データが存在しません。` });
    }

    //カスタム属性リストのIDが存在する場合はリストを削除する
    let selectListId = filterdCaData.selectElementListId
    if (selectListId) {
        //カスタム属性リストファイルの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

        //削除データの作成
        let delCaLists = createDeleteCustomAttributeList(calDecodeFileData, selectListId);
        //データを削除
        errMessage = overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(delCaLists, null, '\t'));

        //削除に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //削除データの作成
    let delCaData = createDeleteCustomAttribute(caDecodeFileData, caId);

    //データを削除
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(delCaData, null, '\t'));

    //削除に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}

/**
 * カスタム属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createDeleteCustomAttribute(fileDataObj: customAttributeType[], delCaId: string)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを削除
        if (element.id === delCaId) {
            Object.keys(element).forEach((item) => {
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                //削除フラグを立てる
                if (item === `deleteFlg`) {
                    element[item] = "1";
                    return true;
                }
            });
            return true;
        }
    });
    return fileDataObj;
}

/**
 * カスタム属性選択リストの削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createDeleteCustomAttributeList(fileDataObj: customAttributeListType[], delCaListId: string)
    : customAttributeListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.forEach((element) => {
        //IDの一致するデータを削除
        if (element.id === delCaListId) {
            Object.keys(element).forEach((item) => {
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                //削除フラグを立てる
                if (item === `deleteFlg`) {
                    element[item] = "1";
                    return true;
                }
            });
        }
    });
    return fileDataObj;
}


/**
 * カスタム属性の更新
 */
export function runUpdCustomAttribute(res: any, req: any, caId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!caId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData = caDecodeFileData.find((element) => {
        return element.id === caId;
    });

    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `更新データが存在しません。` });
    }

    //更新データの作成
    let updCaData = createUpdCustomAttribute(caDecodeFileData, req, caId);

    //選択形式の場合はリストの追加更新をする
    let format = req.body.format;
    if (format === "select" || format === "radio" || format === "checkbox") {

        //カスタム属性リストファイルの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        let updCaLists: customAttributeListType[] = [];

        let selectListId = filterdCaData.selectElementListId;
        //カスタム属性リストのIDが存在する場合はリストを更新する
        if (selectListId) {

            //更新データの作成
            updCaLists = createUpdCustomAttributeList(calDecodeFileData, req, selectListId, authResult);
        }
        //リストの新規登録
        else {
            let calRegistData: registSelectListRetType = {
                errMsg: "",
                registSelectList: []
            };
            let tmp = updCaData.find((element) => { return element.id === caId });

            if (!tmp) {
                return res
                    .status(500)
                    .json({ errMsg: "更新対象のデータが存在しません。" });
            }

            //カスタム属性リストの登録用データの作成
            calRegistData = createAddCustomAttributeList(calDecodeFileData, req, tmp, authResult);

            //IDの整合性エラー
            if (calRegistData.errMsg) {
                return res
                    .status(500)
                    .json({ errMsg: calRegistData.errMsg });
            }
            updCaLists = calRegistData.registSelectList;
        }

        //データを更新
        errMessage = overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(updCaLists, null, '\t'));

        //更新に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //データを更新
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(updCaData, null, '\t'));

    //更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * カスタム属性の更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createUpdCustomAttribute(fileDataObj: customAttributeType[], body: customAttributeType, updTaskId: string)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === updTaskId) {
            Object.keys(element).forEach((item) => {
                if (item === `id` || item === `deleteFlg`) return true;
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                element[item] = body[item];
            });
            return true;
        }
    });

    return fileDataObj;
}

/**
 * カスタム属性選択リストの更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createUpdCustomAttributeList(fileDataObj: customAttributeListType[],
    req: any, id: string, authResult: authInfoType)
    : customAttributeListType[] {

    //現在日付を取得
    const nowDate = getNowDate();
    let selectList = req.body.selectElementList;

    selectList.forEach((element, i) => {
        let tmp = fileDataObj.find((element1) => {
            return element1.id === id && element1.no === i.toString();
        });
        //更新
        if (tmp) {
            tmp.content = element;
            tmp.updTime = nowDate;
            tmp.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
        }
        //登録
        else {
            let body: customAttributeListType = {
                id: id,
                no: (i + 1).toString(),
                content: selectList[i],
                registerTime: nowDate,
                updTime: nowDate,
                userId: authResult.userInfo ? authResult.userInfo?.userId : "",
                deleteFlg: "0",
            };

            fileDataObj.push(body);
        }
    });

    return fileDataObj;
}