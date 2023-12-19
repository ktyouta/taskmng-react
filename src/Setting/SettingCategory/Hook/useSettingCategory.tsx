import { atom, useAtom, useAtomValue } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カスタム属性のID
export const categoryIdAtom = atom("");


function useSettingCategory() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ユーザーのID
    const categoryId = useAtomValue(categoryIdAtom);

    return { editMode, categoryId }

}

export default useSettingCategory;
