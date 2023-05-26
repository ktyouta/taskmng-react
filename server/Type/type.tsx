//リクエストボディのタイプ
export type bodyObj = {
    [prop: string]: any
}

//認証情報
export type authInfoType = {
    status: number,
    errMessage: string,
    userInfo?: userInfoType
}

//ユーザー情報
export type userInfoType = {
    userId: string,
    userName: string,
    password?: string,
    auth: string,
}

//メソッドタイプ
export type methodType = "POST" | "PUT" | "DELETE"

//タスクリストの型
export type taskListType = {
    [key: string]: string,
    id: string,
    title: string,
    content: string,
    registerTime: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
    deleteFlg: string,
}

//汎用詳細の型
export type generalDetailType = {
    id: string,
    value: string,
    label: string,
}

//検索条件の型
export type searchConditionType = {
    id: string,
    name: string,
    type: string,
    listKey: string,
    value: string,
}