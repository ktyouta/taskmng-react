import { FLG } from "../Common/Const/CommonConst";
import { getNowDate } from "../Common/Function";
import { taskCustomAttributeSelectType, taskListType } from "./Type/TaskType";


/**
 * 復元用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createRecoveryTaskData(fileDataObj: taskListType[], delTaskId: string)
    : taskListType[] {

    //IDの一致するタスクを取得
    let recoveryTask = fileDataObj.find((element) => {
        return element.id === delTaskId;
    });

    if (!recoveryTask) {
        return fileDataObj;
    }

    //削除フラグをオフにする
    recoveryTask.updTime = getNowDate();
    recoveryTask.deleteFlg = FLG.OFF;

    return fileDataObj;
}


/**
 * カスタム属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteCustomAttributeData(
    customDecodeFileDatas: taskCustomAttributeSelectType[],
    recTaskId: string)
    : taskCustomAttributeSelectType[] {

    let recCustomAttributeObj = customDecodeFileDatas.find((element) => {
        return element.taskId === recTaskId;
    });

    if (!recCustomAttributeObj) {
        return customDecodeFileDatas;
    }

    //IDの一致するデータを復元
    recCustomAttributeObj.deleteFlg = FLG.OFF;
    recCustomAttributeObj.updTime = getNowDate();

    return customDecodeFileDatas;
}