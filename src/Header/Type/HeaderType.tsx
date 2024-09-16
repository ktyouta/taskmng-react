import { taskHistoryType } from "../../Home/Type/HomeType";

//作業履歴用オブジェクト
export type workHistoryObjType = {
    workHistoryList: taskHistoryType[],
    historyListPreDiffLen: number,
}