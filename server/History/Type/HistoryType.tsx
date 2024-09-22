
//タスクの作業履歴の型
export type taskHistoryType = {
    id: string,
    time: string,
    userId: string,
    userName: string,
    taskId: string,
    taskTitle: string,
    editType: string,
    editValue: string,
    deleteFlg: string,
    url: string,
    priority: string,
    status: string,
    iconUrl: string,
    taskDelFlg: string,
}

//登録時のタスクの作業履歴の型
export type addTaskHistoryType = {
    time: string,
    userId: string,
    taskId: string,
    editValue: string,
    deleteFlg: string,
    id: string,
}