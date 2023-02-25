//リクエストボディのタイプ
export type bodyObj = {
    [prop: string]: any
}

//認証情報
export type authInfoType = {
    status: number,
    errMessage: string,
    userInfo: userInfoType
}

//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    password?: string,
    auth: string,
}