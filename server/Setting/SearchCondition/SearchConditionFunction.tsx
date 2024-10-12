import { authenticate, checkUpdAuth } from "../../Auth/AuthFunction";
import { authInfoType } from "../../Auth/Type/AuthType";
import { overWriteData } from "../../Common/FileFunction";
import { SEARCHCONDITION_FILE_PATH, SEARCHCONDITION_QUERYLRY } from "./Const/SearchConditionConst";
import { createAddSearchCondition } from "./SearchConditionRegisterFunction";
import { filterdQueryParamSearchCondition, filterSearchConditionByUserAuth, getFilterdSearchConditionList, getSearchConditionList, getSearchConditionObj, joinSelectListSearchCondition } from "./SearchConditionSelectFunction";
import { createUpdSearchCondition, createUpdSearchConditionList } from "./SearchConditionUpdateFunction";
import { retSearchConditionType, searchConditionType, settingSearchConditionUpdReqType } from "./Type/SearchConditionType";


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

    //ユーザーの権限
    let userAuth = authResult.userInfo?.auth;

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //ユーザー権限でフィルター
    searchConditionList = filterSearchConditionByUserAuth(searchConditionList, userAuth);

    //該当データなし
    if (searchConditionList.length === 0) {
        return res.status(400).json({ errMessage: `検索条件が存在しません。` });
    }

    //クエリパラメータでデータをフィルターする
    let retSearchConditionList = filterdQueryParamSearchCondition(searchConditionList, req.query[SEARCHCONDITION_QUERYLRY]);

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

/**
 * 検索条件設定の一括更新
 */
export function runUpdSearchConditionList(res: any, req: any) {

    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //リクエストボディ
    let body: settingSearchConditionUpdReqType = req.body;

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionObj();

    //更新用データの作成
    let updData = createUpdSearchConditionList(searchConditionList, body, authResult);

    //データを登録
    let errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(updData, null, '\t'));

    //エラー
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}