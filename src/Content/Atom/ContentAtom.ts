import { atom } from "jotai";
import { menuListType, userInfoType } from "../../Common/Type/CommonType";
import { authType } from "../../Common/Hook/useCheckAuth";

//ユーザー情報ATOM
export const userInfoAtom = atom<userInfoType | undefined>(undefined);
//メニューATOM
export const clientMenuListAtom = atom<menuListType[]>([]);
//権限リストATOM
export const userAuthListAtom = atom<authType[]>([]);