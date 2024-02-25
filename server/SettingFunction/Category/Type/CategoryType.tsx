import { customAttributeListType } from "../../../Type/type"

//カテゴリの型
export type categoryType = {
    id: string,
    name: string,
    path: string,
    componentName: string,
    auth: string,
    isHidden: string,
    order: string,
    deleteFlg: string,
    registerTime: string,
    updTime: string,
    userId: string,
}

//表示順変更時の型
export type checkOrderType = {
    id: string,
    order: string,
}

//カスタム属性の選択リストの登録メソッドの戻り値
export type registSelectListRetType = {
    errMsg: string,
    registSelectList: customAttributeListType[]
}