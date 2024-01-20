import { RefObject } from "react"
import { refType } from "../../../Common/Type/CommonType"

//デフォルト属性の型
export type defaultAttributeType = {
    id: string,
    name: string,
    description: string,
    type: string,
    isRequired: boolean,
    registerTime?: string,
    updTime?: string,
    isNewCreateVisible: boolean,
    selectElementList: selectListType[],
    isHidden: boolean,
    length: number,
    isSettingEditable: boolean,
    initValue: string,
}

//デフォルト属性の更新時の型
export type defaultAttributeUpdType = {
    name: string,
    description: string,
    isRequired: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    length: number,
    selectElementList: selectListType[],
    initValue: string,
}

//選択リストの型
export type selectListType = {
    value: string,
    label: string,
}

//入力欄参照用の型
export type defaultAttributeInputRefType = {
    label: string,
    value: string,
    ref: RefObject<refType>,
}

//初期値の型
export type initRefValueType = {
    selectElementList: selectListType[],
    initValue: string,
    ref: RefObject<refType>,
}