import { authType } from "../../../Auth/Type/AuthType"

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

//登録時のユーザー情報
export type registUserInfoType = {
    userId: string,
    userName: string,
    password?: string,
    deleteFlg?: string,
    registerTime: string,
    updTime: string,
    iconUrl: string,
    iconType: string,
}

//更新時のユーザー情報
export type updUserInfoType = {
    userId: string,
    userName: string,
    password?: string,
    auth: string,
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
    deleteFlg?: string,
    registerTime: string,
    updTime: string,
    iconUrl: string,
    iconType: string,
    authList: authType[],
}