import { atom } from "jotai";
import { taskContentDisplayType, taskListType } from "../Type/TaskType";

//検索条件用オブジェクト
export const taskSearchConditionObjAtom = atom<{ [key: string]: string }>({});
//詳細画面へのルーティング用ID
export const detailRoutingIdAtom = atom("");
//画面表示用タスクリスト
export const displayTaskListAtom = atom<taskContentDisplayType[]>([]);
//タスク取得用URL
export const taskListUrlAtom = atom(``);
//更新用タスク
export const updTaskAtom = atom([]);
//APIから取得したタスクリスト
export const orgTaskListAtom = atom<taskListType[] | undefined>(undefined);
//画面表示用タスクリスト
export const taskListAtom = atom<taskListType[] | undefined>(undefined);
//タスク画面の権限
export const taskAuthorityAtom = atom(``);