import { bodyObj, comboType, inputAddMasterSettingType, inputMasterSettingType, inputType, refInfoType } from "../../Common/Type/CommonType";

//タスクリストの型
export type taskListType = {
    [key: string]: string | customAttributeListType[] | undefined | boolean,
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
    customAttribute?: customAttributeListType[],
    userName?: string,
    statusLabel?: string,
    priorityLabel?: string,
    deleteFlg: string,
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
    bdColor: string | undefined,
    titleBgColor: string | undefined,
    infoBgColor: string | undefined,
    editButton: JSX.Element,
    taskContent: taskListType,
    onClickTitle: () => void,
}

//閲覧用タスクの型
export type viewTaskType = {
    title: string,
    value: string,
}

//検索条件リストの型(タスク)
export type taskSearchConditionType = {
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

//タスク編集画面の入力欄の設定
export type inputTaskSettingType = {
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
    isEditableOther: boolean,
}

//画面表示用タスクの型
export type displayTaskType = {
    default: viewTaskType[],
    customAttribute: viewTaskType[],
}

//APIから取得するタスク詳細の型
export type apiTaskDetailType = {
    default: taskListType,
    customAttribute: customAttributeListType[],
}

//編集画面表示用タスクの型
export type editDisplayTaskType = {
    default: refInfoType[],
    customAttribute: refInfoType[],
}

//カスタム属性のリクエストボディの型
export type customAttributeRequestBodyType = {
    customAttributeId: string,
    selectedValue: string,
}

//タスクのリクエストボディの型
export type taskRequestBodyType = {
    default: bodyObj,
    customAttribute: customAttributeRequestBodyType[],
}

//タスクの検索条件の型
export type taskSearchConditionRefType = {
    [key: string]: refInfoType[],
    default: refInfoType[],
    custom: refInfoType[],
}

//選択したタスクを削除するリクエストの型
export type reqDelSelectedTaskType = {
    delTaskIdList: string[],
}

//選択したタスクを復元するリクエストの型
export type reqRecSelectedTaskType = {
    recTaskIdList: string[],
}