import { getGeneralDetailData } from "../General/GeneralFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";
import { inputSettingType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { memoListType } from "./Type/MemoType";
import { getFilterdMemo } from "./MemoSelectFunction";



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