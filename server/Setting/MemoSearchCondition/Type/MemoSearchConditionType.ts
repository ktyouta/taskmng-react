import { comboType } from "../../../Common/Type/CommonType"

//メモ検索条件設定(ユーザー単位)の更新用リクエストの型
export type settingPrivateMemoSearchConditionUpdReqType = {
    condition: settingMemoSearchConditionUpdType[]
}

//メモ検索条件設定の更新用の型
export type settingMemoSearchConditionUpdType = {
    [key: string]: string,
    id: string,
    value: string,
}

//ユーザー毎のメモ検索条件の型
export type memoPrivateSearchConditionType = {
    id: string,
    value: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string,
}


//メモ検索条件リストの型
export type memoSearchConditionListType = {
    [key: string]: string | boolean | comboType[],
    id: string,
    name: string,
    type: string,
    isHidden: boolean,
    value: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string,
    listKey: string,
    selectList: comboType[],
    description: string,
}