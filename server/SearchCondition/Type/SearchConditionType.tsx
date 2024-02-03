import { comboType } from "../../Type/type"

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
    userId: string
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