import { getMenuAuth } from "../Auth/AuthFunction";
import { authType } from "../Auth/Type/AuthType";
import { TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { resActionAuthType } from "../Common/Type/CommonType";
import { resUserInfoType } from "../Setting/User/Type/UserType";



/**
 * タスク画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserTaskAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, TASK_CATEGORY_ID);
}