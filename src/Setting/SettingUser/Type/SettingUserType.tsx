//ユーザー情報の型
export type userType = {
    userId: string,
    userName: string,
    password: string,
    auth: string,
    authNm: string,
    registerTime?: string,
    updTime?: string,
}

//登録更新時のユーザー情報の型
export type updUserType = {
    userId: string,
    userName: string,
    password: string,
    auth: string,
    registerTime?: string,
    updTime?: string,
}
