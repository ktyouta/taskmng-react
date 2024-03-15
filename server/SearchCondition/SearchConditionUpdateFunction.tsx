import { authInfoType } from "../Auth/Type/AuthType";
import { getNowDate } from "../Common/Function";
import { searchConditionType, settingSearchConditionUpdReqType } from "./Type/SearchConditionType";

/**
 * 検索条件設定の更新用データの作成
 */
export function createUpdSearchCondition(searchConditionList: searchConditionType[], body: searchConditionType, id: string,
    authResult: authInfoType) {

    //更新データ
    let updData = searchConditionList.find((element) => {
        return element.id === id;
    });

    if (!updData) {
        return searchConditionList;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    updData.attribute = body.attribute;
    updData.listKey = body.listKey;
    updData.name = body.name;
    updData.type = body.type;
    updData.value = body.value;
    updData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    updData.updTime = nowDate;
    updData.deleteFlg = "0";

    return searchConditionList;
}


/**
 * 検索条件設定リストの更新用データの作成
 */
export function createUpdSearchConditionList(searchConditionList: searchConditionType[], body: settingSearchConditionUpdReqType,
    authResult: authInfoType) {

    //現在日付を取得
    const nowDate = getNowDate();

    body.condition.forEach((element) => {
        let searchCondition = searchConditionList.find((element1) => {
            return element.id === element1.id;
        });

        if (!searchCondition) {
            return;
        }

        //IDに一致するデータを更新
        searchCondition.value = element.value;
        searchCondition.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
        searchCondition.updTime = nowDate;
    });

    return searchConditionList;
}