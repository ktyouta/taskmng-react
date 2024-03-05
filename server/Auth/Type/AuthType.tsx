import { userInfoType } from "../../SettingFunction/User/Type/UserType"

//認証情報
export type authInfoType = {
    status: number,
    errMessage: string,
    userInfo?: userInfoType
}