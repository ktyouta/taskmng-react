import { searchConditionType } from "../../SearchCondition/Type/SearchConditionType";
import { createUpdSearchCondition } from "../../SearchCondition/SearchConditionUpdateFunction";
import { createCustomAttributeSelectListNewId, createCustomAttributeSelectListNewNo } from "./CustomAttributeSelectFunction";
import { customAttributeListType, customAttributeType, registSelectListRetType, reqClientCustomAttributeType, retCreateUpdCustomAttributeType, selectElementListType } from "./Type/CustomAttributeType";
import { getNowDate } from "../../Common/Function";
import { CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH } from "./Const/CustomAttributeConst";
import { createAddCustomAttributeList } from "./CustomAttributeRegistFunction";
import { authInfoType } from "../../Auth/Type/AuthType";
import { ATTRIBUTE_KEY_CUSTOM } from "../../SearchCondition/Const/SearchConditionConst";
import { getFileJsonData, overWriteData } from "../../Common/FileFunction";


/**
 * カスタム属性の更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCustomAttribute(fileDataObj: customAttributeType[], body: reqClientCustomAttributeType,
    updTaskId: string, authResult: authInfoType)
    : retCreateUpdCustomAttributeType {

    let retObj = {
        updDatas: fileDataObj,
        errMessage: ""
    };

    //カスタム属性リストの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    let updData = fileDataObj.find((element) => {
        return element.id === updTaskId;
    });

    //更新対象のデータが存在しない
    if (!updData) {
        retObj.updDatas = fileDataObj
        return retObj;
    }

    //自身以外のカスタム属性と名称が被っている場合はエラーとする
    if (fileDataObj.filter((element) => {
        return element.deleteFlg !== "1" && element.id !== updTaskId
    }).find((element) => { return element.name === body.name.trim() })) {
        retObj.errMessage = "同一名称のカスタム属性が存在します。"
        return retObj;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    updData.name = body.name.trim();
    updData.length = body.length;
    updData.description = body.description;
    updData.required = body.required;
    updData.type = body.type;
    updData.updTime = nowDate;
    updData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";

    //選択リストIDの更新
    if (body.selectElementList && body.selectElementList.length > 0) {
        //選択リストIDを保持していない(入力形式から選択形式に変更された場合)
        if (!updData.selectElementListId) {
            //新規のIDを作成
            updData.selectElementListId = createCustomAttributeSelectListNewId(calDecodeFileData);
        }
    }
    else {
        //選択形式から入力形式に変更された場合
        if (updData.selectElementListId) {
            //IDを削除
            updData.selectElementListId = "";
        }
    }

    retObj.updDatas = fileDataObj;

    return retObj;
}


/**
 * カスタム属性の追加および更新
 * @param updCaDatas カスタム属性リスト
 * @param filterdCaData 更新対象のカスタム属性
 * @param req 
 * @param caId 
 * @param authResult 
 * @returns 
 */
export function runUpdSelectList(updCaDatas: customAttributeType[], filterdCaData: customAttributeType,
    body: reqClientCustomAttributeType, caId: string, authResult: authInfoType)
    : string {

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
    let updCaLists: customAttributeListType[] = [];
    let selectListId = filterdCaData.selectElementListId;
    let selectElementList = body.selectElementList ?? [];

    //カスタム属性リストのIDが存在する場合はリストを更新する
    if (selectListId) {
        //更新データの作成
        updCaLists = createUpdCustomAttributeList(calDecodeFileData, selectElementList, selectListId, authResult);
    }
    //リストの新規登録
    else {
        let calRegistData: registSelectListRetType = {
            errMsg: "",
            registSelectList: []
        };
        let updCaData = updCaDatas.find((element) => { return element.id === caId });

        if (!updCaData) {
            return "更新対象のデータが存在しません。";
        }

        //カスタム属性リストの登録用データの作成
        calRegistData = createAddCustomAttributeList(calDecodeFileData, selectElementList, updCaData, authResult);

        //IDの整合性エラー
        if (calRegistData.errMsg) {
            return calRegistData.errMsg;
        }
        updCaLists = calRegistData.registSelectList;
    }

    //データを更新
    return overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(updCaLists, null, '\t'));
}


/**
 * カスタム属性選択リストの更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCustomAttributeList(customAttributeSelectList: customAttributeListType[],
    newSelectList: selectElementListType[], id: string, authResult: authInfoType)
    : customAttributeListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //選択リストの登録および更新
    newSelectList.forEach((element, i) => {
        //選択項目の存在チェック
        let updCustomAttributeSelectList = customAttributeSelectList.find((element1) => {
            return element1.id === id && element1.no === element.no;
        });
        //更新
        if (updCustomAttributeSelectList) {
            updCustomAttributeSelectList.updTime = nowDate;
            updCustomAttributeSelectList.userId = authResult.userInfo ? authResult.userInfo?.userId : "";

            //空文字の場合は項目を削除する
            if (!element.value.trim()) {
                updCustomAttributeSelectList.deleteFlg = "1";
                return;
            }

            updCustomAttributeSelectList.content = element.value;
        }
        //登録
        else {
            let body: customAttributeListType = {
                id: id,
                no: createCustomAttributeSelectListNewNo(customAttributeSelectList, id),
                content: newSelectList[i].value,
                registerTime: nowDate,
                updTime: nowDate,
                userId: authResult.userInfo ? authResult.userInfo?.userId : "",
                deleteFlg: "0",
            };

            customAttributeSelectList.push(body);
        }
    });

    //削除済み以外の選択リストを取得
    let filterdCustomAttributeSelectList = customAttributeSelectList.filter((element) => {
        return element.id === id && element.deleteFlg !== "1";
    });

    //画面の選択リストと差分がある場合は、余分な選択リストを削除する
    let diff = filterdCustomAttributeSelectList.length - newSelectList.length;
    if (diff > 0) {
        filterdCustomAttributeSelectList.forEach((element, i) => {
            //画面のリストより余分なリストを削除
            if (!newSelectList[i]) {
                element.deleteFlg = "1";
            }
        });
    }

    return customAttributeSelectList;
}


/**
 * 検索条件設定用データの作成処理の呼び出し
 * @param searchConditionList 
 * @param body 
 * @param authResult 
 * @returns 
 */
export function callCreateUpdSearchCondition(
    searchConditionList: searchConditionType[], body: reqClientCustomAttributeType, customAtrributeId: string,
    registSearchConditionData: customAttributeType[], authResult: authInfoType)
    : searchConditionType[] {

    //カスタム属性の選択リストID
    let selectElementListId = registSearchConditionData.find((element) => {
        return element.id === customAtrributeId;
    })?.selectElementListId;

    //更新データ
    let updData: searchConditionType = {
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

    //更新用データの作成
    let retSearchConditionList = createUpdSearchCondition(searchConditionList, updData, customAtrributeId, authResult);

    return retSearchConditionList;
}