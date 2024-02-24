import { atom } from "jotai";
import { taskContentDisplayType } from "../Type/TaskType";

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
