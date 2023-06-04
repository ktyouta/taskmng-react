//タスクリストの型
export type taskListType = {
    [key: string]: string,
    id: string,
    registerTime: string,
    title: string,
    content: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
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
    [key: string]: string | JSX.Element | undefined | {label:string,value:string,}[],
    title: string,
    bdColor: string | undefined,
    titleBgColor: string | undefined,
    infoBgColor: string | undefined,
    editButton: JSX.Element,
    content:{label:string,value:string,}[]
}