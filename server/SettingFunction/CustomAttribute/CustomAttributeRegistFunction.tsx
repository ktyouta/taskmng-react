import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, customAttributeListType, customAttributeType, searchConditionType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";


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
 * カスタム属性の登録用データの作成
 * @param fileDataObj 読み込んだデータ
 * @param req リクエスト
 * @param authResult ユーザー情報
 * @returns 
 */
export function createAddCustomAttribute(fileDataObj: customAttributeType[], req: any, authResult: authInfoType)
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
export function createAddCustomAttributeList(
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
