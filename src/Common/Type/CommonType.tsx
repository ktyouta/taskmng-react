//画面に表示するテーブル
export type selectedMasterDataType = {
    id: string,
    name: string,
    remarks: string,
}

//テーブルボディの型
export type tableBodyType = {
    id: string,
    body: string[]
}

//カラムの設定リスト
export type masterColumnListType = {
    id: string,
    name: string,
    remarks: string,
}

//メニューのタイプ
export type menuType = {
    url: string,
    name: string,
    auth: string,
}

//リクエストボディのタイプ
export type bodyObj = {
    [prop: string]: any
}

//リクエスト用ユーザー情報
export type reqUserInfoType = {
    userId: string,
    password?: string,
}

//レスポンス用ユーザー情報
export type resUserInfoType = {
    userId: string,
    userName: string,
    auth: string,
}

//apiのレスポンス
export type apiResponseType = {
    status?: number,
    json?: {
        errMessage?: string,
        token?: string,
        userInfo?: {
            userId?: string,
            userName?: string,
            auth?: string,
        }
    }
}

//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    auth: string,
}

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string,
    component?: JSX.Element,
};
