//メモリストの型
export type memoListType = {
    [key: string]: string,
    id: string,
    title: string,
    content: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
}

//メモ検索条件リストの型
export type memoSearchConditionListType = {
    [key: string]: string | boolean,
    id: string,
    name: string,
    type: string,
    isHidden: boolean,
    value: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string
}

//メモコンテンツ設定リストの型
export type memoContentListType = {
    [key: string]: string | boolean,
    id: string,
    name: string,
    type: string,
    isHidden: boolean
}

//メモ入力設定リストの型
export type memoInputSettingListType = {
    [key: string]: string | boolean,
    id: string,
    name: string,
    content: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    type: string,
    length: string,
    disabled: boolean,
    isHidden: boolean,
    isRequired: boolean,
    description: string,
}

//メモの登録リクエストの型
export type memoRegistReqType = {
    title: string,
    content: string,
}