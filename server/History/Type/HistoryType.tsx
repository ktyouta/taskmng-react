
//タスクの作業履歴の型
export type taskHistoryType = {
    time: string,
    userId: string,
    userName: string,
    taskId: string,
    taskTitle: string,
    editType: string,
    editValue: string,
    deleteFlg: string,
    url: string,
}

//登録時のタスクの作業履歴の型
export type addTaskHistoryType = {
    time: string,
    userId: string,
    taskId: string,
    editValue: string,
    deleteFlg: string,
}