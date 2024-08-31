import { atom } from "jotai";
import { menuListType, userInfoType } from "../../Common/Type/CommonType";

//ユーザー情報ATOM
export const userInfoAtom = atom<userInfoType | undefined>(undefined);
//メニューATOM
export const clientMenuListAtom = atom<menuListType[]>([]);