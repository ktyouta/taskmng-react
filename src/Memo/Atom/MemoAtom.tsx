import { atom } from "jotai";
import { memoContentDisplayType, memoListType, tagListResType } from "../Type/MemoType";

//検索条件用オブジェクト
export const memoSearchConditionObjAtom = atom<{ [key: string]: string }>({});
//詳細画面へのルーティング用ID
export const detailRoutingIdAtom = atom("");
//画面表示用メモリスト
export const displayMemoListAtom = atom<memoContentDisplayType[]>([]);
//メモ取得用URL
export const memoListUrlAtom = atom(``);
//更新用メモ
export const updMemoAtom = atom([]);
//APIから取得したメモリスト
export const orgMemoListAtom = atom<memoListType[] | undefined>(undefined);
//画面表示用メモリスト
export const memoListAtom = atom<memoListType[] | undefined>(undefined);
//選択中のタグリスト
export const selectedTagListAtom = atom<tagListResType[]>([]);
//選択中のタグリスト
export const memoListQueryParamAtom = atom("");