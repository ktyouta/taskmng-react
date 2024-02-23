import { getNowDate } from "../Common/Function";
import { authInfoType } from "../Type/type";
import { searchConditionType } from "./Type/SearchConditionType";

/**
 * 検索条件設定の削除用データの作成
 */
export function createDelSearchCondition(searchConditionList: searchConditionType[], id: string,
    authResult: authInfoType) {

    //削除データ
    let delData = searchConditionList.find((element) => {
        return element.id === id;
    });

    if (!delData) {
        return searchConditionList;
    }

    //現在日付を取得
    const nowDate = getNowDate();

    delData.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    delData.updTime = nowDate;
    delData.deleteFlg = "1";

    return searchConditionList;
}