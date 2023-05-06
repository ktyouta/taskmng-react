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
    id: string,
    registerTime: string,
    content: string,
    updTime: string,
    limiTtime: string,
    userId: string,
    priority: string,
    status: string,
}

//汎用詳細の型
export type generalDetailType = {
    id: string,
    value: string,
    name: string,
}