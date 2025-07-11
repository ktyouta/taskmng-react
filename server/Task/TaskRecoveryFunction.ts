import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { FLG, TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction, getNowDate } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
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
export function createRecoveryCustomAttributeData(
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


/**
 * 複数削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createMultiRecoveryTaskData(fileDataObj: taskListType[], deleteTaskIdList: string[])
    : taskListType[] {

    deleteTaskIdList.forEach((element: string) => {

        createRecoveryTaskData(fileDataObj, element);
    });

    return fileDataObj;
}


/**
 * カスタム属性の複数復元用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createMultiRecoveryCustomAttributeData(customDecodeFileDatas: taskCustomAttributeSelectType[], deleteTaskIdList: string[])
    : taskCustomAttributeSelectType[] {

    deleteTaskIdList.forEach((element) => {

        createRecoveryCustomAttributeData(customDecodeFileDatas, element);
    });

    return customDecodeFileDatas;
}