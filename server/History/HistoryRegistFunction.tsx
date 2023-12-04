import { getNowDate } from "../CommonFunction";
import { authInfoType, generalDetailType, userInfoType } from "../Type/type";
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
        deleteFlg: "0"
    };

    decodeFileData.push(registData);

    return decodeFileData;
}