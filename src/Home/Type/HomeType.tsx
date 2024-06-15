
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
    status: string,
    priority: string,
}

//折れ線グラフ用のタスクリストの型
export type lineGraphTaskListType = {
    month: string,
    登録更新削除数: number,
}

//棒グラフ用のタスクリストの型(状態)
export type barGraphTaskStatusListType = {
    name: string,
    未対応: number,
    対応中: number,
    保留: number,
    完了: number,
}

//棒グラフ用のタスクリストの型(優先度)
export type barGraphTaskPriorityListType = {
    name: string,
    低: number,
    中: number,
    高: number
}