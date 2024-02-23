import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import {
    authInfoType,
    customAttributeListType,
    customAttributeType,
} from "../../Type/type";
import {
    CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH,
    PRE_CUSTOMATTRIBUTELIST_ID,
    PRE_CUSTOMATTRIBUTE_ID,
    registSelectListRetType
} from "./CustomAttributeFunction";
import { searchConditionType } from "../../SearchCondition/Type/SearchConditionType";
import { createAddSearchCondition } from "../../SearchCondition/SearchConditionRegisterFunction";
import { ATTRIBUTE_KEY_CUSTOM } from "../../SearchCondition/SearchConditionFunction";
import { retCreateAddCustomAttributeType } from "./Type/CustomAttributeType";
import { createCustomAttributeNewId, createCustomAttributeSelectListNewId } from "./CustomAttributeSelectFunction";
import { getNowDate } from "../../Common/Function";

//inputのmaxlength
const INPUT_LENGTH = "200";
//inputのmaxlength
const TEXTAREA_LENGTH = "2000";


/**
 * カスタム属性の登録用データの作成
 * @param fileDataObj 読み込んだデータ
 * @param req リクエスト
 * @param authResult ユーザー情報
 * @returns 
 */
export function createAddCustomAttribute(fileDataObj: customAttributeType[], body: customAttributeType, authResult: authInfoType)
    : retCreateAddCustomAttributeType {

    let retObj = {
        customAttributeId: "",
        registDatas: fileDataObj,
        errMessage: ""
    };

    //名称が被っている場合はエラーとする
    if (fileDataObj.filter((element) => element.deleteFlg !== "1").find((element) => element.name === body.name.trim())) {
        retObj.errMessage = "同一名称のカスタム属性が存在します。"
        return retObj;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let registData: customAttributeType = {
        id: "",
        registerTime: "",
        updTime: "",
        userId: "",
        deleteFlg: "0",
        name: "",
        type: "",
        required: false,
        selectElementListId: "",
        selectElementList: [],
        description: "",
        length: "0",
    };

    //登録データをセット
    registData = { ...body };
    registData.name = { ...body }.name.trim();
    delete registData.selectElementList;
    registData.selectElementListId = "";
    registData.registerTime = nowDate;
    registData.updTime = nowDate;
    registData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";

    //フォーマットがinputまたはtextareaの場合は、maxlengthをセット
    switch (body.type) {
        case "input":
            registData.length = INPUT_LENGTH;
            break;
        case "textarea":
            registData.length = TEXTAREA_LENGTH;
            break;
    }

    //IDを取得
    retObj.customAttributeId = createCustomAttributeNewId(fileDataObj);

    //選択リストが存在する場合IDを取得
    if (body.selectElementList && body.selectElementList.length > 0) {
        //カスタム属性リストの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        //選択リストIDをセット
        registData.selectElementListId = createCustomAttributeSelectListNewId(calDecodeFileData);
    }

    fileDataObj.push(registData);
    retObj.registDatas = fileDataObj;

    return retObj;
}

/**
 * カスタム属性リストの作成
 * @param caRegistData 
 * @param selectList 
 * @param authResult 
 * @returns 
 */
export function runCreateSelectList(
    caRegistData: customAttributeType[], selectList: string[], authResult: authInfoType) {

    let calRegistData: registSelectListRetType = {
        errMsg: "",
        registSelectList: []
    };

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
    //登録データ
    let tmp: customAttributeType = caRegistData[caRegistData.length - 1];

    //カスタム属性リストの登録用データの作成
    calRegistData = createAddCustomAttributeList(calDecodeFileData, selectList, tmp, authResult);

    //IDの整合性エラー
    if (calRegistData.errMsg) {
        return calRegistData.errMsg;
    }

    //データを登録
    return overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(calRegistData.registSelectList, null, '\t'));
}

/**
 * カスタム属性選択リストの登録用データの作成
 * @param fileDataObj 読み込んだカスタム属性リスト
 * @param selectList 選択リスト
 * @param caData カスタム属性の登録用データ
 * @param authResult ユーザー情報
 * @returns 
 */
export function createAddCustomAttributeList(
    fileDataObj: customAttributeListType[], selectList: string[], caData: customAttributeType, authResult: authInfoType)
    : registSelectListRetType {

    let ret: registSelectListRetType = {
        errMsg: "",
        registSelectList: fileDataObj
    };

    //選択リストが存在しない
    if (!selectList || selectList.length === 0) {
        return ret;
    }

    //IDを取得
    let newId = createCustomAttributeSelectListNewId(fileDataObj);

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
 * 検索条件設定用データの作成処理の呼び出し
 * @param searchConditionList 
 * @param body 
 * @param authResult 
 * @returns 
 */
export function callCreateAddSearchCondition(
    searchConditionList: searchConditionType[], body: customAttributeType, customAtrributeId: string,
    registSearchConditionData: customAttributeType[], authResult: authInfoType)
    : searchConditionType[] {

    //カスタム属性の選択リストID
    let selectElementListId = registSearchConditionData.find((element) => {
        return element.id === customAtrributeId;
    })?.selectElementListId;

    //登録データ
    let registData: searchConditionType = {
        id: customAtrributeId,
        name: body.name,
        type: selectElementListId ? "checkbox" : "input",
        listKey: "",
        value: "",
        attribute: ATTRIBUTE_KEY_CUSTOM,
        registerTime: "",
        updTime: "",
        deleteFlg: "",
        userId: ""
    };

    //登録用データの作成
    let retSearchConditionList = createAddSearchCondition(searchConditionList, registData, authResult);

    return retSearchConditionList;
}
