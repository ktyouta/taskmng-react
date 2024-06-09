import { authInfoType } from "../Auth/Type/AuthType";
import { getNowDate } from "../Common/Function";
import { createTaskHistoryNewId } from "./HistorySelectFunction";
import { addTaskHistoryType, taskHistoryType } from "./Type/HistoryType";


/**
 * タスクの作業履歴を追加
 */
export function createAddTaskHistory(decodeFileData: addTaskHistoryType[], taskId: string
    , editType: string, authResult: authInfoType
) {

    //現在日付を取得
    const nowDate = getNowDate();

    //登録データ
    let registData: addTaskHistoryType = {
        time: nowDate,
        userId: authResult.userInfo ? authResult.userInfo?.userId : "",
        taskId: taskId,
        editValue: editType,
        deleteFlg: "0",
        id: createTaskHistoryNewId(decodeFileData),
    };

    decodeFileData.push(registData);

    return decodeFileData;
}