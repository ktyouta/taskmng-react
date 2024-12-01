import { getMenuAuth } from "../../Auth/AuthFunction";
import { authType } from "../../Auth/Type/AuthType";
import { CUSTOMATTRIBUTE_CATEGORY_ID } from "../../Common/Const/CommonConst";
import { resUserInfoType } from "../User/Type/UserType";



/**
 * カスタム属性画面の権限を取得する
 * @param userInfo 
 * @returns 
 */
export function getUserCustomAttributeAuth(userInfo: resUserInfoType): authType | undefined {

    return getMenuAuth(userInfo, CUSTOMATTRIBUTE_CATEGORY_ID);
}