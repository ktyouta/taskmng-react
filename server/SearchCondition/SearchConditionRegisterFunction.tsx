import { authInfoType } from "../Auth/Type/AuthType";
import { getNowDate } from "../Common/Function";
import { searchConditionType } from "./Type/SearchConditionType";

/**
 * 検索条件設定の登録用データの作成
 */
export function createAddSearchCondition(searchConditionList: searchConditionType[], body: searchConditionType,
    authResult: authInfoType) {

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let registData: searchConditionType = {
        id: "",
        name: "",
        type: "",
        listKey: "",
        value: "",
        attribute: "",
        registerTime: "",
        updTime: "",
        deleteFlg: "",
        userId: ""
    };

    registData = body;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.deleteFlg = "0";

    searchConditionList.push(registData);

    return searchConditionList;
}