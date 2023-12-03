import { authenticate } from "../AuthFunction";
import { getFilterdTaskHistory, joinGeneralSetting } from "./HistorySelectFunction";
import { taskHistoryType } from "./Type/HistoryType";


/**
 * タスクの作業履歴の取得
 */
export function getTaskHistory(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //タスクの作業履歴オブジェクトの取得
    let decodeFileData: taskHistoryType[] = getFilterdTaskHistory();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `作業履歴が存在しません。` });
    }

    //汎用詳細と紐づける
    decodeFileData = joinGeneralSetting(decodeFileData);

    return res.status(200).json(decodeFileData);
}