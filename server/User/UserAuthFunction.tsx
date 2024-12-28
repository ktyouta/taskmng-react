import { getMenuAuth } from "../Auth/AuthFunction";
import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { USER_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { resUserInfoType } from "../Setting/SettingUser/Type/SettingUserType";


/**
 * ユーザー画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserScreenAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, USER_CATEGORY_ID);
}


/**
 * ユーザー設定画面の更新権限チェック
 * @returns 
 */
export function checkSettingUserUpdAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合更新可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * ユーザー設定画面の詳細情報取得権限チェック
 * @returns 
 */
export function checkSettingUserGetDetailAuth(settingUserAuth: authType) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //専用ユーザー権限以上の場合リスト取得可能
    if (!checkAuthAction(settingUserAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}