import { authenticate } from "../Auth/AuthFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { overWriteData } from "../FileFunction";
import { TASK_HISTORY_PATH } from "./Const/HistoryConst";
import { createAddTaskHistory } from "./HistoryRegistFunction";
import { createHistoryMessage, createTaskUrl, getAddTaskHistoryObj, getFilterdTaskHistory, joinGeneralSetting } from "./HistorySelectFunction";
import { addTaskHistoryType, taskHistoryType } from "./Type/HistoryType";


/**
 * タスクの作業履歴の取得
 */
export function getTaskHistory(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスクの作業履歴オブジェクトの取得
    let decodeFileData: taskHistoryType[] = getFilterdTaskHistory();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `作業履歴が存在しません。` });
    }

    //汎用詳細と紐づける
    decodeFileData = joinGeneralSetting(decodeFileData);

    //履歴のメッセージを作成
    //decodeFileData = createHistoryMessage(decodeFileData);

    //タスクのURLを作成
    decodeFileData = createTaskUrl(decodeFileData);

    return res.status(200).json(decodeFileData);
}

/**
 * タスクの作業履歴の登録
 */
export function runAddTaskHistory(authResult: authInfoType, taskId: string, editType: string) {

    //タスクの作業履歴オブジェクトの取得
    let decodeFileData: addTaskHistoryType[] = getAddTaskHistoryObj();

    //登録用データの作成
    let registData = createAddTaskHistory(decodeFileData, taskId, editType, authResult);

    //データを登録
    let errMessage = overWriteData(TASK_HISTORY_PATH, JSON.stringify(registData, null, '\t'));

    if (errMessage) {
        return "作業履歴の登録に失敗しました。"
    }

    return errMessage;
}