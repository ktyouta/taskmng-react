import { getMenuAuth } from "../../Auth/AuthFunction";
import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { authType } from "../../Auth/Type/AuthType";
import { DEFAULTATTRIBUTE_CATEGORY_ID } from "../../Common/Const/CommonConst";
import { checkAuthAction } from "../../Common/Function";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { resUserInfoType } from "../User/Type/UserType";



/**
 * デフォルト属性画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserDefaultAttributeAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, DEFAULTATTRIBUTE_CATEGORY_ID);
}


/**
 * デフォルト属性画面のリスト取得権限チェック
 * @returns 
 */
export function checkDefaultAttributeGetAuth(settingUserAuth: authType) {

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
 * デフォルト属性画面の詳細取得権限チェック
 * @returns 
 */
export function checkDefaultAttributeGetDetailAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //専用権限以上の場合リスト取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.EXCLUSIVE)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * デフォルト属性画面の更新権限チェック
 * @returns 
 */
export function checkDefaultAttributeUpdAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //管理者権限以上の場合リスト取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.ADMIN)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}