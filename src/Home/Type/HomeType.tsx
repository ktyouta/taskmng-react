
//タスクの作業履歴の型
export type taskHistoryType = {
    [key: string]: string,
    time: string,
    userName: string,
    taskId: string,
    taskTitle: string,
    editType: string,
    historyMessage: string,
    url: string,
}

//グラフ用のタスクリストの型
export type barGraphTaskListType = {
    month: string,
    登録更新削除数: number,
}