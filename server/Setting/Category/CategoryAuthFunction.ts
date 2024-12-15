import { getMenuAuth } from "../../Auth/AuthFunction";
import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { authType } from "../../Auth/Type/AuthType";
import { SETTINGCATEGORY_CATEGORY_ID } from "../../Common/Const/CommonConst";
import { checkAuthAction } from "../../Common/Function";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { resUserInfoType } from "../User/Type/UserType";



/**
 * カテゴリ画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserCategoryAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, SETTINGCATEGORY_CATEGORY_ID);
}


/**
 * カテゴリ画面の詳細取得権限チェック
 * @returns 
 */
export function checkCategoryGetDetialAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //専用権限以上の場合詳細取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.EXCLUSIVE)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * カテゴリ画面の登録権限チェック
 * @returns 
 */
export function checkCategoryAddAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //管理者権限以上の場合登録可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * カテゴリ画面の削除権限チェック
 * @returns 
 */
export function checkCategoryDelAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //管理者権限以上の場合削除可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * カテゴリ画面の更新権限チェック
 * @returns 
 */
export function checkCategoryUpdAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //管理者権限以上の場合更新可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * カテゴリ画面の表示順更新権限チェック
 * @returns 
 */
export function checkCategoryChangeOrderAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //管理者権限以上の場合削除可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}