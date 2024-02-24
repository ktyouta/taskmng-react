import { atom, useAtom, useAtomValue } from "jotai";
import { categoryIdAtom, editModeAtom } from "../Atom/SettingCategoryAtom";



function useSettingCategory() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ユーザーのID
    const categoryId = useAtomValue(categoryIdAtom);

    return { editMode, categoryId }

}

export default useSettingCategory;
