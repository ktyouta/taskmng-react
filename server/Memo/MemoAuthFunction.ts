import { getMenuAuth } from "../Auth/AuthFunction";
import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { MEMO_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { resUserInfoType } from "../Setting/SettingUser/Type/SettingUserType";
import { memoListType } from "./Type/MemoType";

/**
 * メモ画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserMemoAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, MEMO_CATEGORY_ID);
}


/**
 * メモの登録権限チェック
 * @param authList 
 * @returns 
 */
export function checkMemoRegistAuth(
    userMemoAuthObj: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合登録可能
    if (!checkAuthAction(userMemoAuthObj.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "メモの登録権限が存在しません。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * メモの更新権限チェック
 * @param authList 
 * @returns 
 */
export function checkMemoUpdAuth(
    userInfo: resUserInfoType,
    updTargetMemo: memoListType,
    taskAuth: authType): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //更新対象メモの作成ユーザーと更新ユーザーが一致していない場合
    if (updTargetMemo.userId !== userInfo.userId) {

        switch (taskAuth.auth) {
            //一般
            case USER_AUTH.PUBLIC:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのメモを更新できません。";
                break;
            //専用
            case USER_AUTH.EXCLUSIVE:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのメモを更新できません。";
                break;
            //管理者
            case USER_AUTH.ADMIN:
                break;
        }
    }

    return resActionAuthObj;
}


/**
 * 削除実行ユーザーと削除対象のメモを確認
 * @param authList 
 * @returns 
 */
function checkUserMemoDelAuth(
    userInfo: resUserInfoType,
    delTargetMemo: memoListType,
    taskAuth: string): resActionAuthType {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //削除対象メモの作成ユーザーと更新ユーザーが一致していない場合
    if (delTargetMemo.userId !== userInfo.userId) {

        switch (taskAuth) {
            //一般
            case USER_AUTH.PUBLIC:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのメモを削除できません。";
                break;
            //専用
            case USER_AUTH.EXCLUSIVE:
                resActionAuthObj.status = 403;
                resActionAuthObj.message = "他ユーザーのメモを削除できません。";
                break;
            //管理者
            case USER_AUTH.ADMIN:
                break;
        }
    }

    return resActionAuthObj;
}


/**
 * メモの削除権限チェック
 * @param authList 
 * @returns 
 */
export function checkMemoDelAuth(
    userInfo: resUserInfoType,
    delTargetMemo: memoListType,
    taskAuth: authType): resActionAuthType {

    //削除実行ユーザーと削除対象のメモを確認
    let resActionAuthObj = checkUserMemoDelAuth(userInfo, delTargetMemo, taskAuth.auth);

    return resActionAuthObj;
}


/**
 * メモ画面のリスト取得権限チェック
 * @returns 
 */
export function checkMemoGetAuth(settingUserAuth: authType) {

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
 * メモ画面の詳細取得権限チェック
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
