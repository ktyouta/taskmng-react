//ユーザー情報の型
export type userType = {
    [key: string]: string | undefined,
    userId: string,
    userName: string,
    password: string,
    auth: string,
    authNm: string,
    registerTime?: string,
    updTime?: string,
    iconUrl: string,
    iconType: string,
}

//登録更新時のユーザー情報の型
export type updUserType = {
    userId: string,
    userName: string,
    password: string,
    auth: string,
    iconUrl: string,
    iconType: string,
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
    auth?: string,
    iconUrl?: string,
    iconType?: string,
}