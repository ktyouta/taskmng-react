import { authenticate } from "./AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    SEARCHCONDITIONFILEPATH,
    SETTINGFILEPATH,
    TASKFILENM,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "./Constant";
import { getFileJsonData, overWriteData, readFile } from "./FileFunction";
import { getGeneralDetailData } from "./GeneralFunction";
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

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //パスパラメータの指定あり
    if (id) {
        let singleCustomAttributeData = decodeFileData.find((element) => { return element.id === id });
        if (!singleCustomAttributeData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
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

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    //カスタム属性の登録用データの作成
    let caRegistData = createAddCustomAttribute(caDecodeFileData, req, authResult);

    //カスタム属性リストの登録用データの作成
    let calregistData = createAddCustomAttributeList(calDecodeFileData, req, caRegistData, authResult);

    //IDの整合性エラー
    if (calregistData.errMsg) {
        return res
            .status(500)
            .json({ errMsg: calregistData.errMsg });
    }

    //データを登録
    let errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(caRegistData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //データを登録
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(calregistData.registData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}


/**
 * カスタム属性の登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createAddCustomAttribute(fileDataObj: customAttributeType[], req: any, authResult: authInfoType)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let body: customAttributeType = {
        id: "",
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: "",
        name: "",
        format: "",
        required: false,
        selectElementListId: ""
    };

    //登録データをセット
    body = req.body;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.deleteFlg = "0";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTE_ID}`, "");
    //新しいIDを割り当てる
    body.id = `${PRE_CUSTOMATTRIBUTE_ID}${parseInt(id) + 1}`;

    //選択リストが存在する場合IDを取得
    if (req.body.selectElementList && req.body.selectElementList.length > 0) {
        //カスタム属性リストの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        let len = calDecodeFileData.length;
        //IDを取得
        let calId = len === 0 ? "1" : fileDataObj[len - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTELIST_ID}`, "");
        //選択リストIDをセット
        body.selectElementListId = calId;
    }

    fileDataObj.push(body);

    return fileDataObj;
}

/**
 * カスタム属性リストの登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createAddCustomAttributeList(
    fileDataObj: customAttributeListType[], req: any, caData: customAttributeType[], authResult: authInfoType)
    : { errMsg: string, registData: customAttributeListType[] } {

    let ret: { errMsg: string, registData: customAttributeListType[] } = {
        errMsg: "",
        registData: fileDataObj
    };

    //選択リスト
    let selectList = req.body.selectElementList;

    //選択リストが存在しない
    if (!selectList || selectList.length === 0) {
        return ret;
    }

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTELIST_ID}`, "");

    //IDの整合性チェック
    if (caData.length === 0 || id !== caData[caData.length - 1].selectElementListId) {
        ret.errMsg = "選択リストの登録に失敗しました"
        return ret;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let body: customAttributeListType = {
        id: "",
        list: [],
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: ""
    };

    //登録データをセット
    body.list = selectList;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.deleteFlg = "0";

    //新しいIDを割り当てる
    body['id'] = `${PRE_CUSTOMATTRIBUTELIST_ID}${parseInt(id) + 1}`;
    fileDataObj.push(body);
    ret.registData = fileDataObj;

    return ret;
}
