//検索条件設定の更新用の型
export type settingSearchConditionUpdType = {
    [key: string]: string,
    id: string,
    value: string,
}

//検索条件設定の更新用リクエストの型
export type settingSearchConditionUpdReqType = {
    condition: settingSearchConditionUpdType[]
}

//メモ検索条件設定の更新用の型
export type settingMemoSearchConditionUpdType = {
    [key: string]: string,
    id: string,
    value: string,
}

//メモ検索条件設定の更新用リクエストの型
export type settingSMemoearchConditionUpdReqType = {
    condition: settingMemoSearchConditionUpdType[]
}