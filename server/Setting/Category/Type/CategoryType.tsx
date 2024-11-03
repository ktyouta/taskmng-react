import { customAttributeListType } from "../../CustomAttribute/Type/CustomAttributeType"

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

//サブカテゴリの型
export type subCategoryType = {
    id: string,
    parentId: string,
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

//レスポンス用のカテゴリリストの型
export type resCategoryType = categoryType & {
    subMenuList: categoryType[]
}