import { authenticate } from "../Auth/AuthFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH } from "../Common/Const.tsx/CommonConst";
import { overWriteData } from "../FileFunction";
import { SEARCHCONDITION_FILE_PATH, SEARCHCONDITION_QUERYLRY } from "./Const/SearchConditionConst";
import { createAddSearchCondition } from "./SearchConditionRegisterFunction";
import { getFilterdSearchConditionList, getSearchConditionList, joinSelectListSearchCondition } from "./SearchConditionSelectFunction";
import { createUpdSearchCondition } from "./SearchConditionUpdateFunction";
import { retSearchConditionType, searchConditionType } from "./Type/SearchConditionType";


/**
 * 検索条件設定リストの取得
 */
export function getSearchCondition(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //該当データなし
    if (searchConditionList.length === 0) {
        return res.status(400).json({ errMessage: `検索条件が存在しません。` });
    }

    //クエリストリング
    let queryStr = req.query[SEARCHCONDITION_QUERYLRY];
    let tmpSearchConditionList: searchConditionType[] = [];
    let retSearchConditionList: searchConditionType[] = queryStr ? [] : searchConditionList;

    //クエリストリングが設定されている場合は絞り込む
    if (queryStr && queryStr.split(",").length > 0) {
        let queryArr = queryStr.split(",");
        tmpSearchConditionList = JSON.parse(JSON.stringify(searchConditionList));

        //クエリストリングに一致する検索条件設定を取得して結合
        queryArr.forEach((element: string) => {
            let tmp = getFilterdSearchConditionList(tmpSearchConditionList, element);
            retSearchConditionList = [...retSearchConditionList, ...tmp];
        });
    }

    //選択リストを結合
    let joinedSearchConditionList: retSearchConditionType[] = joinSelectListSearchCondition(retSearchConditionList);

    return res.status(200).json(joinedSearchConditionList);
}


/**
 * 検索条件設定の登録
 */
export function runAddSearchCondition(authResult: authInfoType, body: searchConditionType) {

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //登録用データの作成
    let registData = createAddSearchCondition(searchConditionList, body, authResult);

    //データを登録
    let errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(registData, null, '\t'));

    if (errMessage) {
        return "検索条件設定の登録に失敗しました。";
    }

    //正常終了
    return "登録が完了しました。";
}


/**
 * 検索条件設定の更新
 */
export function runUpdSearchCondition(authResult: authInfoType, body: searchConditionType, id: string) {

    //IDの指定がない
    if (!id) {
        return "パラメータが不正です。";
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //更新用データの作成
    let updData = createUpdSearchCondition(searchConditionList, body, id, authResult);

    //データを登録
    let errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(updData, null, '\t'));

    if (errMessage) {
        return "検索条件設定の更新に失敗しました。";
    }

    //正常終了
    return "";
}