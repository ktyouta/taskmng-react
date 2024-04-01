import { userInfoType } from "../../Setting/User/Type/UserType"

//認証情報
export type authInfoType = {
    status: number,
    errMessage: string,
    userInfo?: userInfoType
}