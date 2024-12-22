import { getMenuAuth } from "../Auth/AuthFunction";
import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { resUserInfoType } from "../Setting/SettingUser/Type/SettingUserType";
import { taskListType } from "./Type/TaskType";



/**
 * タスク画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserTaskAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, TASK_CATEGORY_ID);
}


/**
 * タスクの登録権限チェック
 * @param authList 
 * @returns 
 */
export function checkTaskRegistAuth(
    userTaskAuthObj: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合登録可能
    if (!checkAuthAction(userTaskAuthObj.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "タスクの登録権限が存在しません。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
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


/**
 * タスクの更新権限チェック
 * @param authList 
 * @returns 
 */
export function checkTaskUpdAuth(
    userInfo: resUserInfoType,
    updTargetTask: taskListType,
    taskAuth: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //更新対象タスクの作成ユーザーと更新ユーザーが一致していない場合
    if (updTargetTask.userId !== userInfo.userId) {

        switch (taskAuth.auth) {
            //一般
            case USER_AUTH.PUBLIC:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのタスクを更新できません。";
                break;
            //専用
            case USER_AUTH.EXCLUSIVE:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのタスクを更新できません。";
                break;
            //管理者
            case USER_AUTH.ADMIN:
                break;
        }
    }

    return resActionAuthObj;
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
export function checkTaskDelAuth(
    userInfo: resUserInfoType,
    delTargetTask: taskListType,
    taskAuth: authType): resActionAuthType {

    //削除実行ユーザーと削除対象のタスクを確認
    let resActionAuthObj = checkUserTaskDelAuth(userInfo, delTargetTask, taskAuth.auth);

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
    deleteTaskList: string[],
    taskAuth: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

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
        resActionAuthObj = checkUserTaskDelAuth(userInfo, delTargetTask, taskAuth.auth);

        return resActionAuthObj.message;
    });

    return resActionAuthObj;
}


/**
 * タスク画面のリスト取得権限チェック
 * @returns 
 */
export function checktaskGetAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合リスト取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * タスク画面の詳細取得権限チェック
 * @returns 
 */
export function checktaskGetDetailAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合リスト取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}
