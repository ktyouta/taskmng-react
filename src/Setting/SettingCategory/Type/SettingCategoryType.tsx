import { RefObject } from "react"
import { refType } from "../../../Common/Type/CommonType"

//カテゴリの型
export type categoryType = {
    id: string,
    name: string,
    path: string,
    auth: string,
    isHidden: string,
    order: string,
    registerTime: string,
    updTime: string,
}

//カテゴリの型(登録更新用)
export type registCategoryType = {
    name: string,
    path: string,
    auth: string,
    isHidden: string,
}

//入力欄参照用の型
export type refCategoryInfoType = {
    id: string,
    path: string,
    name: string,
    order: string,
    isHidden: string,
    ref: RefObject<refType>,
}
