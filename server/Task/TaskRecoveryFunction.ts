import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { FLG, TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction, getNowDate } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { resUserInfoType } from "../Setting/User/Type/UserType";
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


/**
 * 復元権限チェック
 * @param authList 
 * @returns 
 */
export function checkTaskRecAuth(
    taskAuth: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //権限チェック(管理者以上のみ復元可能)
    if (!checkAuthAction(taskAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "タスクの復元権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}