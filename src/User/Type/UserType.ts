//ユーザー情報の入力欄の型
export type userInfoInputType = {
    userId?: string,
    userName?: string,
    password?: string,
    iconUrl?: string,
    iconType?: string,
}

//登録更新時の権限情報の型
export type reqAuthReqType = {
    userId: string;
    menuId: string;
    auth: string;
}

//更新時のユーザー情報の型
export type updUserReqType = {
    userName: string,
    password: string,
    iconUrl: string,
    iconType: string,
}