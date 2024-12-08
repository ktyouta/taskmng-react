import { authType } from "../../../Common/Hook/useCheckAuth"

//ユーザー情報の型
export type userType = {
    userId: string,
    userName: string,
    password: string,
    registerTime?: string,
    updTime?: string,
    iconUrl: string,
    iconType: string,
    authList: authType[]
}

//登録更新時のユーザー情報の型
export type updUserType = {
    userId: string,
    userName: string,
    password: string,
    iconUrl: string,
    iconType: string,
    authList: authType[],
}

//APIから取得するアイコンリストの型
export type imageListResType = {
    [key: string]: string,
    iconUrl: string,
}

//ユーザー情報の入力欄の型
export type userInputType = {
    userId?: string,
    userName?: string,
    password?: string,
    iconUrl?: string,
    iconType?: string,
}