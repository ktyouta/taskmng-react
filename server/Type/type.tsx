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
    authNm?: string,
    deleteFlg?: string,
    registerTime: string,
    updTime: string,
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

//カスタム属性の型
export type customAttributeType = {
    [key: string]: string | string[] | boolean | undefined,
    id: string,
    name: string,
    type: inputType,
    required: boolean,
    selectElementList?: string[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
}

//カスタム属性リストの型
export type customAttributeListType = {
    id: string,
    no: string,
    content: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
}

//タスクに紐づくカスタム属性の選択値の型
export type taskCustomAttributeSelectedType = {
    taskId: string,
    customAttributeId: string,
    selectedValue: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string
}

//ラベルと値の型
export type comboType = {
    label: string,
    value: string,
}

//画面返却用のタスク詳細の型
export type taskDetailType = {
    default: taskListType,
    customAttribute: inputSettingType[]
}

//入力欄参照用の型
export type inputSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: string,
    disabled: boolean,
    visible: boolean,
    value: string,
    selectList?: comboType[],
    description?: string,
    isRequired?: boolean,
    errMessage?: string,
}

//inputのタイプ
export type inputType = "input" | "select" | "radio" | "date" | "textarea" | "checkbox" | "number" | "label" | "";

//タスクのカスタム属性の選択値の型
export type taskCustomAttributeSelectType = {
    taskId: string,
    customAttributeId: string,
    selectedValue: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string
}