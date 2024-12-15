import { atom } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//デフォルト属性のID
export const defaultAttributeIdAtom = atom("");
//デフォルト属性画面の権限
export const settingDefaultAuthorityAtom = atom(``);