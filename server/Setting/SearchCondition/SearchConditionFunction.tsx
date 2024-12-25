import { authenticate } from "../../Auth/AuthFunction";
import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { overWriteData, overWriteFileData } from "../../Common/FileFunction";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { getGeneralDataList } from "../../General/GeneralSelectFunction";
import { generalDetailType } from "../../General/Type/GeneralType";
import { getUserTaskAuth } from "../../Task/TaskAuthFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../CustomAttribute/CustomAttributeSelectFunction";
import { customAttributeListType, customAttributeType } from "../CustomAttribute/Type/CustomAttributeType";
import { SEARCHCONDITION_FILE_PATH, SEARCHCONDITION_QUERYLRY, TASK_PRIVATE_SEARCHCONDITION_FILE_PATH } from "./Const/SearchConditionConst";
import { getTaskSearchConditionMemoAuth, getUserPrivateSearchConditionUpdAuth, getUserSearchConditionAuth } from "./SearchConditionAuthFunction";
import { createAddSearchCondition } from "./SearchConditionRegisterFunction";
import { filterdQueryParamSearchCondition, filterSearchConditionByUserAuth, getFilterdSearchConditionList, getPrivateSearchConditionList, getPrivateSearchConditionObj, getSearchConditionList, getSearchConditionObj, getUserPrivateSearchConditionList, joinSearchCondition, joinSelectListSearchCondition, joinSelectListTaskSearchCondition } from "./SearchConditionSelectFunction";
import { createUpdPrivateSearchConditionList, createUpdSearchCondition, createUpdSearchConditionList, filterConditionsByAuth } from "./SearchConditionUpdateFunction";
import { retSearchConditionType, searchConditionType, settingPrivateSearchConditionUpdReqType, settingSearchConditionUpdReqType, taskPrivateSearchConditionType } from "./Type/SearchConditionType";


/**
 * 検索条件設定リストの取得
 */
export function getSearchCondition(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得
    let taskUseruth = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskUseruth || !taskUseruth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限が存在しないため検索条件を取得できません。" });
    }

    //検索設定マスタファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //ユーザー毎のタスク検索条件設定を取得する
    let taskPrivateSearchConditionList: taskPrivateSearchConditionType[] = getUserPrivateSearchConditionList(authResult.userInfo.userId);

    //検索条件マスタとユーザーの検索条件設定を結合する
    searchConditionList = joinSearchCondition(searchConditionList, taskPrivateSearchConditionList);

    //ユーザー権限でフィルター
    searchConditionList = filterSearchConditionByUserAuth(searchConditionList, taskUseruth.auth);

    //クエリパラメータでデータをフィルターする
    let retSearchConditionList = filterdQueryParamSearchCondition(searchConditionList, req.query[SEARCHCONDITION_QUERYLRY]);

    //汎用詳細ファイルの読み込み
    let generalDatas: generalDetailType[] = getGeneralDataList();
    //カスタム属性の読み込み
    let customAttributeList: customAttributeType[] = getCustomAttributeData();
    //カスタム属性リストファイルの読み込み
    let customAttributeSelectList: customAttributeListType[] = getCustomAttributeListData();

    //選択リストを結合
    let joinedSearchConditionList: retSearchConditionType[] = joinSelectListSearchCondition(
        retSearchConditionList,
        generalDatas,
        customAttributeList,
        customAttributeSelectList
    );

    //ユーザーリストと結合
    joinedSearchConditionList = joinSelectListTaskSearchCondition(joinedSearchConditionList);

    //該当データなし
    if (joinedSearchConditionList.length === 0) {
        return res.status(400).json({ errMessage: `検索条件が存在しません。` });
    }

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

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //検索条件設定画面の権限を取得する
    const searchConditionAuth: authType | undefined = getUserSearchConditionAuth(authResult.userInfo);

    //検索条件設定に関する権限が存在しない場合
    if (!searchConditionAuth || !searchConditionAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "検索条件設定画面の権限がありません。" });
    }

    //検索条件設定更新権限チェック
    const searchConditionupdAuthObj: resActionAuthType = getUserPrivateSearchConditionUpdAuth(searchConditionAuth);

    //検索条件設定権限エラー
    if (searchConditionupdAuthObj.message) {
        return res
            .status(searchConditionupdAuthObj.status)
            .json({ errMessage: searchConditionupdAuthObj.message });
    }

    //タスク画面の権限を取得
    const taskUseruth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskUseruth || !taskUseruth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限が存在しないため検索条件を更新できません。" });
    }

    //タスク権限チェック
    const taskUpdAuthObj: resActionAuthType = getTaskSearchConditionMemoAuth(taskUseruth);

    //タスク権限エラー
    if (taskUpdAuthObj.message) {
        return res
            .status(taskUpdAuthObj.status)
            .json({ errMessage: taskUpdAuthObj.message });
    }

    //リクエストボディ
    let body: settingPrivateSearchConditionUpdReqType = req.body;
    //ユーザーID
    let userId = authResult.userInfo.userId;

    //検索設定マスタファイルの読み込み
    let searchConditionMasterList: searchConditionType[] = getSearchConditionList();

    //ユーザー毎のタスク検索条件設定を取得する
    let taskPrivateSearchConditionList: taskPrivateSearchConditionType[] = getPrivateSearchConditionObj();

    //更新用データの作成
    let updData: taskPrivateSearchConditionType[] = createUpdPrivateSearchConditionList(
        taskPrivateSearchConditionList, body, userId);

    //参照権限のない検索条件を削除する
    updData = filterConditionsByAuth(updData, searchConditionMasterList, taskUseruth);

    //更新データをファイルに書き込む
    let errMessage = overWriteFileData(TASK_PRIVATE_SEARCHCONDITION_FILE_PATH, updData);

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