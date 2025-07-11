
//タスクの作業履歴の型
export type taskHistoryType = {
    [key: string]: string,
    time: string,
    userName: string,
    taskId: string,
    taskTitle: string,
    editType: string,
    editValue: string,
    historyMessage: string,
    url: string,
    status: string,
    priority: string,
    iconUrl: string,
    userId: string,
    taskDelFlg: string,
}

//折れ線グラフ用のタスクリストの型
export type lineGraphTaskListType = {
    name: string,
    登録数: number,
    更新数: number,
    削除数: number,
    総数: number,
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