import { taskHistoryType } from "../../Home/Type/HomeType";

//作業履歴用オブジェクトの型
export type workHistoryObjType = {
    workHistoryList: taskHistoryType[],
    historyListPreDiffLen: number,
}

//未読件数オブジェクトの型
export type unReadObjType = {
    diff: number,
    listLen: number,
}

//ローカルストレージ保存用の未読件数オブジェクトの型
export type localSaveUnReadObjType = unReadObjType & {
    unReadInfo: string,
    preDiff: number,
}