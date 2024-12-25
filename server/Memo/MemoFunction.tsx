import { getGeneralDetailData } from "../General/GeneralFunction";
import { authenticate } from "../Auth/AuthFunction";
import { inputSettingType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { memoContentListType, memoListResType, memoListType, memoRegistReqType, memoUpdReqType, retCreateAddMemoDataType } from "./Type/MemoType";
import { convMemo, convMemoDetail, filterMemoQuery, getFilterdMemo, getFilterdUserStatusMemo, getMemoObj, joinMemoDetailTag, joinMemoTag, joinSelectListMemoSearchCondition, joinTagLabelMemoSearchCondition, joinUser } from "./MemoSelectFunction";
import { MEMO_FILEPATH } from "./Const/MemoConst";
import { createAddMemoData, createAddMemoTagData } from "./MemoRegistFunction";
import { createUpdMemoData } from "./MemoUpdateFunction";
import { createDelMemoData } from "./MemoDeleteFunction";
import { tagListType } from "../Tag/Type/TagType";
import { TAG_FILEPATH } from "../Tag/Const/TagConst";
import { getFilterdTag, getTagObj } from "../Tag/TagSelectFunction";
import { authInfoType, authType } from "../Auth/Type/AuthType";
import { checkMemoDelAuth, checkMemoGetAuth, checkMemoRegistAuth, checkMemoUpdAuth, checktaskGetDetailAuth, getUserMemoAuth } from "./MemoAuthFunction";
import { getUserInfoData } from "../Setting/SettingUser/SettingUserSelectFunction";
import { memoSearchConditionListType } from "../Setting/MemoSearchCondition/Type/MemoSearchConditionType";
import { getFilterdMemoSearchCondition } from "../Setting/MemoSearchCondition/MemoSearchConditionSelectFunction";



/**
 * メモリストの取得
 */
export function getMemoList(res: any, req: any) {

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
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモリスト取得権限チェック
    let memoGetListAuthResult = checkMemoGetAuth(memoAuth);

    //権限エラー
    if (memoGetListAuthResult.message) {
        return res
            .status(memoGetListAuthResult.status)
            .json({ errMessage: memoGetListAuthResult.message });
    }

    //クエリストリング
    let queryStr = req.query;

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getFilterdMemo();

    //タグファイルの読み込み
    let decodeTagFileData: tagListType[] = getFilterdTag();

    //画面返却用の型に変換
    let resMemoList: memoListResType[] = convMemo(decodeFileData);

    //クエリストリングでフィルター
    resMemoList = filterMemoQuery(resMemoList, queryStr, decodeTagFileData);

    //メモデータのフィルター
    resMemoList = getFilterdUserStatusMemo(resMemoList, authResult);

    //ユーザーIDとユーザーを結合
    resMemoList = joinUser(resMemoList);

    //タグと結合
    resMemoList = joinMemoTag(resMemoList, decodeTagFileData);

    //該当データなし
    if (resMemoList.length === 0) {
        return res.status(200).json(resMemoList);
    }

    return res.status(200).json(resMemoList);
}


/**
 * メモ詳細の取得
 */
export function getMemoDetail(res: any, req: any, id: string) {

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
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモ詳細取得権限チェック
    let memoGetDetailAuthResult = checktaskGetDetailAuth(memoAuth);

    //権限エラー
    if (memoGetDetailAuthResult.message) {
        return res
            .status(memoGetDetailAuthResult.status)
            .json({ errMessage: memoGetDetailAuthResult.message });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getFilterdMemo();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //詳細を取得
    let memoDetail = decodeFileData.find((element) => { return element.id === id });
    if (!memoDetail) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //画面返却用の型に変換
    let resMemoList: memoListResType = convMemoDetail(memoDetail);

    //タグファイルの読み込み
    let decodeTagFileData: tagListType[] = getFilterdTag();

    //タグと結合
    resMemoList = joinMemoDetailTag(resMemoList, decodeTagFileData);

    return res.status(200).json(resMemoList);
}


/**
 * メモの追加
 */
export function runAddMemo(res: any, req: any) {

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
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモ登録権限チェック
    let memoAddAuthResult = checkMemoRegistAuth(memoAuth);

    //権限エラー
    if (memoAddAuthResult.message) {
        return res
            .status(memoAddAuthResult.status)
            .json({ errMessage: memoAddAuthResult.message });
    }

    //リクエストボディ
    let body: memoRegistReqType = req.body;

    let errMessage = "";

    //タグの登録
    //タグファイルの読み込み
    let decodeTagFileData: tagListType[] = getTagObj();

    //タグ登録用データの作成
    decodeTagFileData = createAddMemoTagData(decodeTagFileData, body, authResult);

    //データを登録
    errMessage = overWriteData(TAG_FILEPATH, JSON.stringify(decodeTagFileData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //登録用データの作成
    let retObj: retCreateAddMemoDataType = createAddMemoData(decodeFileData, decodeTagFileData, body, authResult);

    //メモが登録されていない
    if (!retObj || retObj.memoList.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "メモの登録に失敗しました。" });
    }

    //データを登録
    errMessage = overWriteData(MEMO_FILEPATH, JSON.stringify(retObj.memoList, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}


/**
 * メモの更新
 */
export function runUpdMemo(res: any, req: any, updMemoId: string) {

    //IDの指定がない
    if (!updMemoId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

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
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //更新対象のメモを取得する
    let updMemo = decodeFileData.find((element: memoListType) => {
        return element.id === updMemoId;
    });

    //更新対象のメモが存在しない
    if (!updMemo) {
        return res
            .status(400)
            .json({ errMessage: `更新対象のメモが存在しません。` });
    }

    //メモ更新権限チェック
    let memoUpdAuthResult = checkMemoUpdAuth(authResult.userInfo, updMemo, memoAuth);

    //権限エラー
    if (memoUpdAuthResult.message) {
        return res
            .status(memoUpdAuthResult.status)
            .json({ errMessage: memoUpdAuthResult.message });
    }

    //リクエストボディ
    let body: memoUpdReqType = req.body;

    let errMessage = "";

    //タグの登録
    //タグファイルの読み込み
    let decodeTagFileData: tagListType[] = getTagObj();

    //タグ登録用データの作成
    decodeTagFileData = createAddMemoTagData(decodeTagFileData, body, authResult);

    //データを登録
    errMessage = overWriteData(TAG_FILEPATH, JSON.stringify(decodeTagFileData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //更新用データの作成
    let retObj = createUpdMemoData(decodeFileData, body, updMemoId, decodeTagFileData, authResult);

    //エラー
    if (retObj.errMessage) {
        return res
            .status(400)
            .json({ errMessage: retObj.errMessage });
    }

    //データを登録
    errMessage = overWriteData(MEMO_FILEPATH, JSON.stringify(retObj.memoList, null, '\t'));

    //更新に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}


/**
 * メモの削除
 */
export function runDelMemo(res: any, req: any, delMemoId: string) {

    //IDの指定がない
    if (!delMemoId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

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
            .json({ errMessage: "メモ画面の権限がありません。" });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //削除対象のメモを取得する
    let delMemo = decodeFileData.find((element: memoListType) => {
        return element.id === delMemoId;
    });

    //削除対象のメモが存在しない
    if (!delMemo) {
        return res
            .status(400)
            .json({ errMessage: `削除対象のメモが存在しません。` });
    }

    //メモ削除権限チェック
    let memoDelAuthResult = checkMemoDelAuth(authResult.userInfo, delMemo, memoAuth);

    //権限エラー
    if (memoDelAuthResult.message) {
        return res
            .status(memoDelAuthResult.status)
            .json({ errMessage: memoDelAuthResult.message });
    }

    //削除用データの作成
    let retObj = createDelMemoData(decodeFileData, delMemoId, authResult);

    //エラー
    if (retObj.errMessage) {
        return res
            .status(400)
            .json({ errMessage: retObj.errMessage });
    }

    //データを登録
    let errMessage = overWriteData(MEMO_FILEPATH, JSON.stringify(retObj.memoList, null, '\t'));

    //削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}