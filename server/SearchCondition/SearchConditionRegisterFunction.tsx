import { getNowDate } from "../CommonFunction";
import { authInfoType } from "../Type/type";
import { searchConditionType } from "./Type/SearchConditionType";

/**
 * 検索条件設定の登録用データの作成
 */
export function createAddSearchCondition(searchConditionList: searchConditionType[], body: searchConditionType) {

    //登録データ
    let registData: searchConditionType = {
        id: "",
        name: "",
        type: "",
        listKey: "",
        value: "",
        attribute: ""
    };

    registData = body;
    searchConditionList.push(registData);

    return searchConditionList;
}