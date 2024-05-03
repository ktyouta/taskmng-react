import { tagType } from "../../Common/TagsComponent";
import { bodyObj, comboType, inputType, refInfoType } from "../../Common/Type/CommonType";

//メモリストの型
export type memoListType = {
    [key: string]: string | undefined | tagListResType[],
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
    userNm: string,
    status: string,
    tagList: tagListResType[],
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
    [key: string]: string | JSX.Element | undefined | memoListType | (() => void) | tagContentType[],
    id: string,
    title: string,
    content: memoListType,
    bgColor?: string,
    bdColor?: string,
    status?: string,
    tagList: tagContentType[],
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
    description: string,
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


//メモの登録リクエストの型
export type memoRegistReqType = {
    title: string,
    content: string,
    status: string,
    tagList: tagType[]
}

//APIから取得するメモ詳細
export type apiMemoDetailType = {
    [key: string]: string | undefined | tagType[],
    id: string,
    registerTime: string,
    title: string,
    content: string,
    tagList: tagType[],
    updTime: string,
    limitTime: string,
    userId: string,
    status: string,
}

//メモの更新リクエストの型
export type memoUpdReqType = {
    title: string,
    content: string,
    status: string,
    tagList: tagType[]
}

//レスポンスのタグの型
export type tagListResType = {
    value: string,
    label: string,
}

//コンテンツのタグの型
export type tagContentType = tagListResType & {
    onClickTag: () => void,
}