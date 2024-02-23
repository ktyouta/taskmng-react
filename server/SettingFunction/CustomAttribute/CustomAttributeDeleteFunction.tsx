import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { authInfoType, customAttributeListType, customAttributeType, taskListType } from "../../Type/type";
import { CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH } from "./CustomAttributeFunction";
import { searchConditionType } from "../../SearchCondition/Type/SearchConditionType";
import { createDelSearchCondition } from "../../SearchCondition/SearchConditionDeleteFunction";
import { getNowDate } from "../../Common/Function";


/**
 * カスタム属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteCustomAttribute(fileDataObj: customAttributeType[], delCaId: string, authResult: authInfoType)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    let delData = fileDataObj.find((element) => {
        return element.id === delCaId;
    });

    if (!delData) {
        return fileDataObj;
    }

    delData.deleteFlg = "1";
    delData.updTime = nowDate;
    delData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";

    return fileDataObj;
}

/**
 * カスタム属性リストの削除
 * @param fileDataObj 
 * @param selectListId 
 * @returns 
 */
export function runDeleteSelectList(selectListId: string) {
    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    //削除データの作成
    let delCaLists = createDeleteCustomAttributeList(calDecodeFileData, selectListId);
    //データを削除
    return overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(delCaLists, null, '\t'));
}

/**
 * カスタム属性選択リストの削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteCustomAttributeList(fileDataObj: customAttributeListType[], delCaListId: string)
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
 * 検索条件設定用データの削除処理の呼び出し
 * @param searchConditionList 
 * @param body 
 * @param authResult 
 * @returns 
 */
export function callCreateDelSearchCondition(
    searchConditionList: searchConditionType[], customAtrributeId: string,
    authResult: authInfoType)
    : searchConditionType[] {

    return createDelSearchCondition(searchConditionList, customAtrributeId, authResult);
}