import { authenticate } from "../../Auth/AuthFunction";
import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { overWriteFileData } from "../../Common/FileFunction";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { getUserMemoAuth } from "../../Memo/MemoAuthFunction";
import { joinSelectListMemoSearchCondition, joinTagLabelMemoSearchCondition } from "../../Memo/MemoSelectFunction";
import { getFilterdTag } from "../../Tag/TagSelectFunction";
import { tagListType } from "../../Tag/Type/TagType";
import { getUserPrivateSearchConditionUpdAuth, getUserSearchConditionAuth } from "../SearchCondition/SearchConditionAuthFunction";
import { searchConditionType } from "../SearchCondition/Type/SearchConditionType";
import { getUserInfoData } from "../SettingUser/SettingUserSelectFunction";
import { MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH } from "./Const/MemoSearchConditionConst";
import { getMemoSearchConditionMemoAuth } from "./MemoSearchConditionAuthFunction";
import { createUpdPrivateMemoSearchConditionList, } from "./MemoSearchConditionUpdateFunction";
import { getFilterdMemoSearchCondition, getPrivateMemoSearchConditionList, getPrivateMemoSearchConditionObj, getUserPrivateMemoSearchConditionList, joinMemoSearchCondition } from "./MemoSearchConditionSelectFunction";
import { memoPrivateSearchConditionType, memoSearchConditionListType, settingPrivateMemoSearchConditionUpdReqType } from "./Type/MemoSearchConditionType";



/**
 * メモ検索条件リストの取得
 */
export function getMemoSearchConditionList(res: any, req: any) {

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

    //メモ画面の権限を取得する
    let memoAuth: authType | undefined = getUserMemoAuth(authResult.userInfo);

    //メモに関する権限が存在しない場合
    if (!memoAuth || !memoAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "メモ画面の権限が存在しないため検索条件を取得できません。" });
    }

    //メモ検索条件ファイルの読み込み
    let memoSearchConditionMasterList: memoSearchConditionListType[] = getFilterdMemoSearchCondition();

    //メモ検索条件ファイル(ユーザー単位)の読み込み
    let userMemoSearchConditionList = getPrivateMemoSearchConditionList();

    //検索条件マスタとユーザーの検索条件設定を結合する
    let searchConditionList: memoSearchConditionListType[] = joinMemoSearchCondition(
        memoSearchConditionMasterList, userMemoSearchConditionList, authResult.userInfo.userId);

    //ユーザーリストの読み込み
    let userList = getUserInfoData();

    //タグファイルの読み込み
    let decodeTagFileData: tagListType[] = getFilterdTag();

    //ユーザーリストと結合する
    let resMemoSearchConditionList: memoSearchConditionListType[] = joinSelectListMemoSearchCondition(searchConditionList, userList);

    //タグラベルと結合する
    resMemoSearchConditionList = joinTagLabelMemoSearchCondition(searchConditionList, decodeTagFileData);

    //該当データなし
    if (resMemoSearchConditionList.length === 0) {
        return res.status(200).json(resMemoSearchConditionList);
    }

    return res.status(200).json(resMemoSearchConditionList);
}


/**
 * メモ検索条件設定の一括更新
 */
export function runUpdMemoSearchConditionList(res: any, req: any) {

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

    //メモ画面の権限を取得する
    const memoAuth = getUserMemoAuth(authResult.userInfo);

    //メモ画面の権限情報が存在しない場合
    if (!memoAuth || !memoAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモ権限チェック
    const memoUpdAuthObj: resActionAuthType = getMemoSearchConditionMemoAuth(memoAuth);

    //メモ権限エラー
    if (memoUpdAuthObj.message) {
        return res
            .status(memoUpdAuthObj.status)
            .json({ errMessage: memoUpdAuthObj.message });
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

    //リクエストボディ
    const body: settingPrivateMemoSearchConditionUpdReqType = req.body;
    //ユーザーID
    const userId = authResult.userInfo.userId;

    //ユーザー毎のメモ検索条件設定を取得する
    let memoPrivateSearchConditionList: memoPrivateSearchConditionType[] = getPrivateMemoSearchConditionObj();

    //更新用データの作成
    let updData: memoPrivateSearchConditionType[] = createUpdPrivateMemoSearchConditionList(
        memoPrivateSearchConditionList, body, userId);

    //更新データをファイルに書き込む
    let errMessage = overWriteFileData(MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH, updData);

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