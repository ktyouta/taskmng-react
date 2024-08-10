//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    password?: string,
    auth: string,
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
    auth: string,
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