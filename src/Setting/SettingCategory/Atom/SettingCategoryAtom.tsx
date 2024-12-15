import { atom } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カテゴリのID
export const categoryIdAtom = atom("");
//カテゴリ画面の権限
export const settingCategoryAuthorityAtom = atom(``);