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
}

//登録更新時のユーザー情報
export type updUserInfoType = {
    userId: string,
    userName: string,
    password?: string,
    auth: string,
    deleteFlg?: string,
    registerTime: string,
    updTime: string,
    iconUrl: string,
}