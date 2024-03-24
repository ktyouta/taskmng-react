import { getGeneralDetailData } from "../General/GeneralFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";
import { inputSettingType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { memoContentListType, memoListType, memoRegistReqType, memoSearchConditionListType, memoUpdReqType } from "./Type/MemoType";
import { getFilterdMemo, getFilterdMemoContent, getFilterdSearchCondition, getMemoObj } from "./MemoSelectFunction";
import { MEMO_FILEPATH } from "./Const/MemoConst";
import { createAddMemoData } from "./MemoRegistFunction";
import { createUpdMemoData } from "./MemoUpdateFunction";
import { createDelMemoData } from "./MemoDeleteFunction";



/**
 * メモリストの取得
 */
export function getMemoList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getFilterdMemo();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(200).json(decodeFileData);
    }

    return res.status(200).json(decodeFileData);
}


/**
 * メモ詳細の取得
 */
export function getMemoDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
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

    return res.status(200).json(memoDetail);
}


/**
 * メモ検索条件リストの取得
 */
export function getMemoSearchConditionList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //メモ検索条件ファイルの読み込み
    let decodeFileData: memoSearchConditionListType[] = getFilterdSearchCondition();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(200).json(decodeFileData);
    }

    return res.status(200).json(decodeFileData);
}


/**
 * メモコンテンツ設定リストの取得
 */
export function getMemoContentSettingList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //メモコンテンツファイルの読み込み
    let decodeFileData: memoContentListType[] = getFilterdMemoContent();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(200).json(decodeFileData);
    }

    return res.status(200).json(decodeFileData);
}


/**
 * メモの追加
 */
export function runAddMemo(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //リクエストボディ
    let body: memoRegistReqType = req.body;

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //登録用データの作成
    let retObj = createAddMemoData(decodeFileData, body, authResult);

    //メモが登録されていない
    if (!retObj || retObj.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "メモの登録に失敗しました。" });
    }

    //データを登録
    let errMessage = overWriteData(MEMO_FILEPATH, JSON.stringify(retObj, null, '\t'));

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
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!updMemoId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //リクエストボディ
    let body: memoUpdReqType = req.body;

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //更新用データの作成
    let retObj = createUpdMemoData(decodeFileData, body, updMemoId, authResult);

    //エラー
    if (retObj.errMessage) {
        return res
            .status(400)
            .json({ errMessage: retObj.errMessage });
    }

    //データを登録
    let errMessage = overWriteData(MEMO_FILEPATH, JSON.stringify(retObj.memoList, null, '\t'));

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
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!delMemoId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //メモファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

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