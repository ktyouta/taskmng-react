//ユーザー情報の型
export type userType = {
    userId: string,
    userName: string,
    password: string,
    auth: string,
    authNm: string,
    registerTime?: string,
    updTime?: string,
    iconUrl: string,
}

//登録更新時のユーザー情報の型
export type updUserType = {
    userId: string,
    userName: string,
    password: string,
    auth: string,
    iconUrl: string,
}

//APIから取得するアイコンリストの型
export type imageListResType = {
    [key: string]: string,
    iconUrl: string,
}