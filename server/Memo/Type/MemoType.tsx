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
    status: string,
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

//メモの登録リクエストの型
export type memoRegistReqType = {
    title: string,
    content: string,
    status: string,
}

//メモの更新リクエストの型
export type memoUpdReqType = {
    title: string,
    content: string,
    status: string,
}

//メモの更新データ作成メソッドの返り値の型
export type retCreateUpdMemoType = {
    errMessage: string,
    memoList: memoListType[],
}

//メモリストの画面返却用の型
export type memoListResType = {
    [key: string]: string,
    id: string,
    title: string,
    content: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    status: string,
    userNm: string,
}