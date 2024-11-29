import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authInfoType, authType } from "../Auth/Type/AuthType";
import { FLG, TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { getNowDate } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { getGeneralDetailData } from "../General/GeneralFunction";
import { resUserInfoType } from "../Setting/User/Type/UserType";
import { NO_AUTH_MESSAGE } from "./Const/TaskConst";
import { getCustomAttributeTaskObj } from "./TaskSelectFunction";
import { taskCustomAttributeSelectType, taskListType } from "./Type/TaskType";



/**
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteTaskData(fileDataObj: taskListType[], delTaskId: string)
    : taskListType[] {

    //IDの一致するタスクを取得
    let deleteTask = fileDataObj.find((element) => {
        return element.id === delTaskId;
    });

    if (!deleteTask) {
        return fileDataObj;
    }

    //削除フラグをオンにする
    deleteTask.updTime = getNowDate();
    deleteTask.deleteFlg = FLG.ON;

    return fileDataObj;
}

/**
 * カスタム属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteCustomAttributeData(customDecodeFileDatas: taskCustomAttributeSelectType[], delTaskId: string)
    : taskCustomAttributeSelectType[] {

    customDecodeFileDatas.forEach((element) => {
        //IDの一致するデータを削除
        if (element.taskId === delTaskId) {
            element.deleteFlg = FLG.ON;
            element.updTime = getNowDate();
        }
    });
    return customDecodeFileDatas;
}

/**
 * 複数削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createMultiDeleteTaskData(fileDataObj: taskListType[], deleteTaskIdList: string[])
    : taskListType[] {

    deleteTaskIdList.forEach((element: string) => {

        createDeleteTaskData(fileDataObj, element);
    });

    return fileDataObj;
}

/**
 * カスタム属性の複数削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createMultiDeleteCustomAttributeData(customDecodeFileDatas: taskCustomAttributeSelectType[], deleteTaskIdList: string[])
    : taskCustomAttributeSelectType[] {

    deleteTaskIdList.forEach((element) => {

        createDeleteCustomAttributeData(customDecodeFileDatas, element);
    });

    return customDecodeFileDatas;
}


/**
 * 削除実行ユーザーと削除対象のタスクを確認
 * @param authList 
 * @returns 
 */
function checkUserTaskDelAuth(
    userInfo: resUserInfoType,
    delTargetTask: taskListType,
    taskAuth: string): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //更新対象タスクの作成ユーザーと更新ユーザーが一致していない場合
    if (delTargetTask.userId !== userInfo.userId) {

        switch (taskAuth) {
            //一般
            case USER_AUTH.PUBLIC:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのタスクを削除できません。";
                break;
            //専用
            case USER_AUTH.EXCLUSIVE:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのタスクを削除できません。";
                break;
            //管理者
            case USER_AUTH.ADMIN:
                break;
        }
    }

    return resActionAuthObj;
}


/**
 * タスクの削除権限チェック
 * @param authList 
 * @returns 
 */
export function checkTaskDelAuth(userInfo: resUserInfoType, delTargetTask: taskListType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //ユーザーの権限リストからタスクの権限を取得する
    let userTaskAuthObj = userInfo.authList.find((element) => {
        return element.menuId === TASK_CATEGORY_ID;
    });

    //タスクに関する権限が存在しない場合
    if (!userTaskAuthObj || !userTaskAuthObj.auth) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "タスク画面の権限がありません。";
        return resActionAuthObj;
    }

    //削除実行ユーザーと削除対象のタスクを確認
    resActionAuthObj = checkUserTaskDelAuth(userInfo, delTargetTask, userTaskAuthObj.auth);

    return resActionAuthObj;
}


/**
 * タスクの複数削除権限チェック
 * @param authList 
 * @returns 
 */
export function multiCheckTaskDelAuth(
    fileDataObj: taskListType[],
    userInfo: resUserInfoType,
    deleteTaskList: string[]): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //ユーザーの権限リストからタスクの権限を取得する
    let userTaskAuthObj = userInfo.authList.find((element) => {
        return element.menuId === TASK_CATEGORY_ID;
    });

    //タスク画面の権限
    let taskAuth: string = "";

    //タスクに関する権限が存在しない場合
    if (!userTaskAuthObj || !(taskAuth = userTaskAuthObj.auth)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "タスク画面の権限がありません。";
        return resActionAuthObj;
    }

    //削除対象のタスクリストの権限チェック
    deleteTaskList.some((element: string) => {

        //削除対象のタスクを取得する
        let delTargetTask = fileDataObj.find((element1: taskListType) => {
            return element1.id === element;
        });

        //削除対象のタスクが存在しない
        if (!delTargetTask) {
            return;
        }

        //削除権限チェック
        resActionAuthObj = checkUserTaskDelAuth(userInfo, delTargetTask, taskAuth);

        return resActionAuthObj.message;
    });

    return resActionAuthObj;
}