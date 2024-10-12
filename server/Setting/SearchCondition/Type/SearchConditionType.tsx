import { comboType } from "../../../Common/Type/CommonType"

//検索条件の型
export type searchConditionType = {
    id: string,
    name: string,
    type: string,
    listKey: string,
    value: string,
    attribute: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string,
    auth: string,
}

//検索条件の画面返却用の型
export type retSearchConditionType = {
    id: string,
    name: string,
    type: string,
    selectList: comboType[],
    value: string,
    attribute: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string
}

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