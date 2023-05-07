//タスクリストの型
export type taskListType = {
    id: string,
    registerTime: string,
    content: string,
    updTime: string,
    limiTtime: string,
    userId: string,
    priority: string,
    status: string,
}

//画面表示用タスクリストの型
export type displayTaskListType = {
    id: string,
    content: string,
    registerTime: string,
    updTime: string,
    limiTtime: string,
    priority: string,
    status: string,
    editButton: JSX.Element,
}

//汎用詳細データの型
export type generalDataType = {
    value: string,
    label: string,
}