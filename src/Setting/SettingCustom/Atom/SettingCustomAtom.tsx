import { atom } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カスタム属性のID
export const customAttributeIdAtom = atom("");
//カスタム属性画面の権限
export const settingCustomAuthorityAtom = atom(``);