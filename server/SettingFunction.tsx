import { authenticate } from "./AuthFunction";
import { CUSTOMATTRIBUTE, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "./Constant";
import { getFileJsonData, overWriteData, readFile } from "./FileFunction";
import { getGeneralDetailData } from "./GeneralFunction";
import { checkUpdAuth } from "./MasterDataFunction";
import { authInfoType, customAttributeType, searchConditionType, taskListType } from "./Type/type";
import { getNowDate } from "./CommonFunction";


//カスタム属性ファイルのパス
const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;
//カスタム属性IDの接頭辞
const PRE_CUSTOMATTRIBUTE_ID = `ATTRIBUTEID-`;


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

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //登録用データの作成
    let registData = createAddCustomAttribute(decodeFileData, req, authResult);

    //データを登録
    let errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
function createAddCustomAttribute(fileDataObj: customAttributeType[], req: any, authResult: authInfoType)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: customAttributeType = {
        id: "",
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: "",
        name: "",
        format: "",
        required: false,
        elementListId: ""
    };
    body = req.body;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.deleteFlg = "0";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CUSTOMATTRIBUTE_ID}`, "");
    //新しいIDを割り当てる
    body['id'] = `${PRE_CUSTOMATTRIBUTE_ID}${parseInt(id) + 1}`;
    fileDataObj.push(body);

    return fileDataObj;
}