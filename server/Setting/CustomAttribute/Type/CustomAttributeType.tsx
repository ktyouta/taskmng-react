import { inputType } from "../../../Common/Type/CommonType"

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

//カスタム属性選択リストの型
export type selectElementListType = {
    no: string,
    value: string,
}

//画面から受け取るカスタム属性の型
export type reqClientCustomAttributeType = {
    [key: string]: string | string[] | boolean | undefined | selectElementListType[],
    id: string,
    name: string,
    type: inputType,
    required: boolean,
    selectElementList?: selectElementListType[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string,
    description: string,
    length: string,
}

//画面に返却するカスタム属性の型
export type resClientCustomAttributeType = {
    [key: string]: string | string[] | boolean | undefined | selectElementListType[],
    id: string,
    name: string,
    type: inputType,
    required: boolean,
    selectElementList?: selectElementListType[],
    selectElementListId: string,
    registerTime: string,
    updTime: string,
    userId: string,
    description: string,
    length: string,
}