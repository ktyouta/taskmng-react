import { atom } from "jotai";

//検索条件用オブジェクト
export const taskSearchConditionObjAtom = atom<{ [key: string]: string }>({});
//検索条件設定画面の権限
export const settingSearchConditionAuthorityAtom = atom(``);
//タスク画面の権限
export const taskAuthorityAtom = atom(``);
//メモ画面の権限
export const memoAuthorityAtom = atom(``);