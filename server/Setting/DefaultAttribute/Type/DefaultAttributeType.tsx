import { inputType } from "../../../Common/Type/CommonType"

//デフォルト属性の型
export type defaultAttributeType = {
    [key: string]: string | string[] | boolean | number | selectListType[] | undefined,
    id: string,
    name: string,
    type: inputType,
    isRequired: boolean,
    selectElementList?: selectListType[],
    listKey: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    initValue: string,
    isEditableOther: boolean,
}

//デフォルト属性の更新時の型
export type defaultAttributeUpdType = {
    [key: string]: string | string[] | boolean | number | selectListType[] | undefined,
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