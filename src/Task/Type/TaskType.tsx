//タスクリストの型
export type taskListType = {
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