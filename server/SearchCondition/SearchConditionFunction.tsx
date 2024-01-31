import { authenticate } from "../AuthFunction";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH } from "../Constant";
import { overWriteData } from "../FileFunction";
import { createAddSearchCondition } from "./SearchConditionRegisterFunction";
import { getFilterdSearchConditionList, getSearchConditionList } from "./SearchConditionSelectFunction";
import { searchConditionType } from "./Type/SearchConditionType";


//検索条件設定ファイルのパス
export const SEARCHCONDITION_FILE_PATH = `${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`

/**
 * 検索条件設定リストの取得
 */
export function getSearchCondition(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //検索設定ファイルの読み込み
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


/**
 * 検索条件設定の登録
 */
export function runAddSearchCondition(res: any, req: any) {

    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    let body: searchConditionType = req.body;

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //登録用データの作成
    let registData = createAddSearchCondition(searchConditionList, body);

    //データを登録
    let errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(registData, null, '\t'));

    if (errMessage) {
        return "検索条件設定の登録に失敗しました。"
    }

    return errMessage;
}