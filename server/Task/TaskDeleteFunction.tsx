import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authInfoType } from "../Auth/Type/AuthType";
import { FLG } from "../Common/Const/CommonConst";
import { getNowDate } from "../Common/Function";
import { getGeneralDetailData } from "../General/GeneralFunction";
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
 * 削除可能チェック
 */
export function checkDeletable(delTask: taskListType, authResult: authInfoType) {

    //タスク作成ユーザー
    let createTaskUserId = delTask.userId;
    //ユーザーID
    let userId = authResult.userInfo?.userId;
    //ユーザー権限
    let userAuth = authResult.userInfo?.auth;
    //エラーメッセージ
    let errMessage = "";

    switch (userAuth) {
        //一般
        case USER_AUTH.PUBLIC:
            errMessage = createTaskUserId === userId ? "" : NO_AUTH_MESSAGE;
            break;
        //専用
        case USER_AUTH.EXCLUSIVE:
            errMessage = createTaskUserId === userId ? "" : NO_AUTH_MESSAGE;
            break;
        //管理者
        case USER_AUTH.ADMIN:
            break;
    }

    return errMessage;
}