import { taskHistoryType } from "../../Home/Type/HomeType";

//作業履歴用オブジェクト
export type workHistoryObjType = {
    workHistoryList: taskHistoryType[],
    historyListPreDiffLen: number,
}

//未読件数オブジェクト
export type unReadObjType = {
    nowDiff: number,
    nowListLen: number,
}