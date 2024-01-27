import { authenticate } from "../AuthFunction";
import { searchConditionType } from "../Type/type";
import { getFilterdSearchConditionList, getSearchConditionList } from "./SearchConditionSelectFunction";

/**
 * 検索条件設定リストの取得
 */
export function getSearchCondition(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //タスクファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //該当データなし
    if (searchConditionList.length === 0) {
        return res.status(400).json({ errMessage: `検索条件が存在しません。` });
    }

    //クエリストリング
    let queryStr = req.query["attribute"];
    let tmpSearchConditionList: searchConditionType[] = [];
    let retSearchConditionList: searchConditionType[] = queryStr ? [] : searchConditionList;

    if (queryStr && queryStr.split(",")) {
        let queryArr = queryStr.split(",");
        tmpSearchConditionList = JSON.parse(JSON.stringify(searchConditionList));

        //クエリストリングに一致する検索条件設定を取得して結合
        queryArr.forEach((element: string) => {
            let tmp = getFilterdSearchConditionList(tmpSearchConditionList, element);
            retSearchConditionList.concat(tmp);
        });
    }

    return res.status(200).json(searchConditionList);
}