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
export function getUserSearchConditionAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, SEARCHCONDITON_CATEGORY_ID);
}


/**
 * 検索条件設定画面(ユーザー単位)の更新権限を取得する
 */
export function getUserPrivateSearchConditionUpdAuth(settingSearchConditionAuth: authType,) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合更新可能
    if (!checkAuthAction(settingSearchConditionAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "権限が不足しています。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}


/**
 * タスク画面の権限をもとに更新権限を確認する
 */
export function getTaskSearchConditionMemoAuth(memoAuth: authType,) {

    let resActionAuthObj: resActionAuthType = {
        status: 200,
        message: ""
    };

    //一般権限以上の場合更新可能
    if (!checkAuthAction(memoAuth.auth, USER_AUTH.PUBLIC)) {
        resActionAuthObj.status = 403;
        resActionAuthObj.message = "タスク画面の権限が不足しているため検索条件を更新できません。";
        return resActionAuthObj;
    }

    return resActionAuthObj;
}