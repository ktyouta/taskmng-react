import { authType } from "../../Auth/Type/AuthType";

//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    password?: string,
    authNm?: string,
    deleteFlg?: string,
    registerTime: string,
    updTime: string,
    iconUrl: string,
    iconType: string,
}


//レスポンス用ユーザー情報
export type resUserInfoType = {
    userId: string,
    userName: string,
    password?: string,
    iconUrl: string,
    iconType: string,
}


//更新時のユーザー情報の型
export type updUserReqType = {
    userName: string,
    password: string,
    iconUrl: string,
    iconType: string,
}