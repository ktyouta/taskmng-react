import { getMenuAuth } from "../../Auth/AuthFunction";
import { authType } from "../../Auth/Type/AuthType";
import { CUSTOMATTRIBUTE_CATEGORY_ID, SEARCHCONDITON_CATEGORY_ID } from "../../Common/Const/CommonConst";
import { resUserInfoType } from "../User/Type/UserType";



/**
 * 検索条件設定画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserSearchConditionAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, SEARCHCONDITON_CATEGORY_ID);
}