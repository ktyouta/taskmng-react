import { bodyObj, comboType, inputAddMasterSettingType, inputMasterSettingType, inputType, refInfoType } from "../../Common/Type/CommonType";

//メモリストの型
export type memoListType = {
    [key: string]: string | customAttributeListType[] | undefined,
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
}

//画面表示用メモリストの型
export type displayMemoListType = {
    id: string,
    title: string,
    registerTime: string,
    updTime: string,
    limitTime: string,
    priority: string,
    status: string,
    editButton: JSX.Element,
    bdColor: string | undefined,
    titleBgColor: string | undefined,
    infoBgColor: string | undefined,
}

//メモコンテンツの型
type memoContentInputType = "date";

//画面表示用メモの設定用の型
export type memoContentSettingType = {
    [key: string]: string | memoContentInputType | boolean | undefined,
    id: string,
    name: string,
    type?: memoContentInputType,
    isHidden: boolean,
    listKey?: string,
}

//画面表示用のメモの型
export type memoContentDisplayType = {
    [key: string]: string | JSX.Element | undefined | { label: string, value: string, }[] | (() => void),
    id: string,
    title: string,
    bdColor: string | undefined,
    titleBgColor: string | undefined,
    infoBgColor: string | undefined,
    editButton: JSX.Element,
    content: { label: string, value: string, }[],
    onClickTitle: () => void,
}

//閲覧用メモの型
export type viewMemoType = {
    title: string,
    value: string,
}

//検索条件リストの型(メモ)
export type memoSearchConditionType = {
    id: string,
    name: string,
    type: inputType,
    selectList: comboType[],
    length: number,
    value: string,
    isHidden: boolean,
    attribute: string,
}

//カスタム属性リストの型
export type customAttributeListType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    disabled: boolean,
    visible: boolean,
    value: string,
    selectList: comboType[],
    description?: string,
    isRequired?: boolean,
    errMessage?: string,
}

//メモ編集画面の入力欄の設定
export type inputMemoSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    initValue: string,
    disabled: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    listKey?: string,
    description?: string,
    isRequired?: boolean,
}

//画面表示用メモの型
export type displayMemoType = {
    default: viewMemoType[],
    customAttribute: viewMemoType[],
}

//編集画面表示用メモの型
export type editDisplayMemoType = {
    default: refInfoType[],
    customAttribute: refInfoType[],
}

//カスタム属性のリクエストボディの型
export type customAttributeRequestBodyType = {
    customAttributeId: string,
    selectedValue: string,
}

//メモのリクエストボディの型
export type memoRequestBodyType = {
    default: bodyObj,
    customAttribute: customAttributeRequestBodyType[],
}

//メモの検索条件の型
export type memoSearchConditionRefType = {
    [key: string]: refInfoType[],
    default: refInfoType[],
    custom: refInfoType[],
}


//メモの登録リクエストの型
export type memoRegistReqType = {
    title: string,
    content: string,
}

//APIから取得するメモ詳細
export type apiMemoDetailType = {
    [key: string]: string | customAttributeListType[] | undefined,
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
}

//メモの更新リクエストの型
export type memoUpdReqType = {
    title: string,
    content: string,
}