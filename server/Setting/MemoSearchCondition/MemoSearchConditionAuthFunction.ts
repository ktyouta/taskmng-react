import { getMenuAuth } from "../../Auth/AuthFunction";
import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { authType } from "../../Auth/Type/AuthType";
import { CUSTOMATTRIBUTE_CATEGORY_ID, SEARCHCONDITON_CATEGORY_ID } from "../../Common/Const/CommonConst";
import { checkAuthAction } from "../../Common/Function";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { resUserInfoType } from "../SettingUser/Type/SettingUserType";



/**
 * 検索条件設定画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserMemomSearchConditionAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, SEARCHCONDITON_CATEGORY_ID);
}


/**
 * メモ画面の権限をもとに更新権限を確認する
 */
export function getMemoSearchConditionMemoAuth(memoAuth: authType,) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合更新可能
    if (!checkAuthAction(memoAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "メモ画面の権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}

/**
 * 検索条件設定画面(ユーザー単位)の更新権限を取得する
 */
export function getUserPrivateMemomSearchConditionUpdAuth(settingSearchConditionAuth: authType,) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合更新可能
    if (!checkAuthAction(settingSearchConditionAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "検索条件権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}