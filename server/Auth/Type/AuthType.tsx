import { resUserInfoType, userInfoType } from "../../Setting/SettingUser/Type/SettingUserType"

//認証情報
export type authInfoType = {
    status: number,
    errMessage: string,
    userInfo?: resUserInfoType
}

//権限データ
export type authType = {
    userId: string,
    menuId: string,
    auth: string,
}