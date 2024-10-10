import { inputSettingType } from "../../Common/Type/CommonType"

//タスクリストの型
export type taskListType = {
    [key: string]: string,
    id: string,
    title: string,
    content: string,
    registerTime: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
    deleteFlg: string,
}

//画面返却用のタスク詳細の型
export type taskDetailType = {
    default: retDefaultTaskType,
    customAttribute: inputSettingType[]
}

//タスクの登録用データの作成時の返却用の型
export type retCreateAddTaskType = {
    registDatas: taskListType[],
    newTaskId: string,
}

//タスクに紐づくカスタム属性の選択値の型
export type taskCustomAttributeSelectedType = {
    taskId: string,
    customAttributeId: string,
    selectedValue: string,
    registerTime: string,
    updTime: string,
    userId: string,
    deleteFlg: string
}

//タスクのカスタム属性の選択値の型
export type taskCustomAttributeSelectType = {
    taskId: string,
    customAttributeId: string,
    selectedValue: string,
    registerTime: string,
    updTime: string,
    deleteFlg: string,
    userId: string
}

//画面返却用のデフォルト属性の型
export type retDefaultTaskType = taskListType & {
    userName: string,
}

//複数削除時のリクエストボディ
export type multiDeleteTaskReqType = {
    taskIdList: string[]
}

//レスポンス用のタスク一覧の型
export type resTaskListType = {
    [key: string]: string | undefined,
    id: string,
    title: string,
    content: string,
    registerTime: string,
    updTime: string,
    limitTime: string,
    userId: string,
    priority: string,
    status: string,
    deleteFlg: string,
    statusLabel?: string,
    priorityLabel?: string,
    userName?: string,
}