import { atom } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カスタム属性のID
export const userIdAtom = atom("");
//ユーザー画面の権限
export const settingUserAuthorityAtom = atom(``);