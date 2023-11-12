import { comboType, inputAddMasterSettingType, inputMasterSettingType, inputType, refInfoType } from "../../Common/Type/CommonType";

//タスクリストの型
export type taskListType = {
    [key: string]: string | customAttributeListType[] | undefined,
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
    customAttribute?: customAttributeListType[]
}

//画面表示用タスクリストの型
export type displayTaskListType = {
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

//タスクコンテンツの型
type taskContentInputType = "date";

//画面表示用タスクの設定用の型
export type taskContentSettingType = {
    [key: string]: string | taskContentInputType | boolean | undefined,
    id: string,
    name: string,
    type?: taskContentInputType,
    isHidden: boolean,
    listKey?: string,
}

//画面表示用のタスクの型
export type taskContentDisplayType = {
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

//閲覧用タスクの型
export type viewTaskType = {
    title: string,
    value: string,
}

//検索条件リストの型
export type searchConditionType = {
    task: taskSearchConditionType[]
}

//検索条件リストの型(タスク)
export type taskSearchConditionType = {
    id: string,
    name: string,
    type: inputType,
    listKey?: string,
    length: number,
    value: string,
    isHidden: boolean,
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

//タスク編集画面の入力欄の設定
export type inputTaskSettingType = {
    id: string,
    name: string,
    type: inputType,
    length: number,
    value: string,
    disabled: boolean,
    isNewCreateVisible: boolean,
    isHidden: boolean,
    listKey?: string,
    description?: string,
    isRequired?: boolean,
}

//画面表示用タスクの型
export type displayTaskType = {
    default: viewTaskType[],
    customAttribute: viewTaskType[],
}

//APIから取得するタスク詳細の型
export type apiTaskDetailType = {
    default: viewTaskType[],
    customAttribute: customAttributeListType[],
}

//編集画面表示用タスクの型
export type editDisplayTaskType = {
    default: refInfoType[],
    customAttribute: refInfoType[],
}