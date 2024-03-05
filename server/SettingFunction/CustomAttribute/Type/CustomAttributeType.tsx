import { inputType } from "../../../Type/type"

//カスタム属性の登録用データの作成時の返却用の型
export type retCreateAddCustomAttributeType = {
    customAttributeId: string,
    registDatas: customAttributeType[],
    errMessage: string,
}

//カスタム属性の更新用データの作成時の返却用の型
export type retCreateUpdCustomAttributeType = {
    updDatas: customAttributeType[],
    errMessage: string,
}

//カスタム属性の型
export type customAttributeType = {
    [key: string]: string | string[] | boolean | undefined,
    id: string,
    name: string,
    type: inputType,
    required: boolean,
    selectElementList?: string[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
}

//カスタム属性リストの型
export type customAttributeListType = {
    id: string,
    no: string,
    content: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
}

//カスタム属性の選択リストの登録メソッドの戻り値
export type registSelectListRetType = {
    errMsg: string,
    registSelectList: customAttributeListType[]
}