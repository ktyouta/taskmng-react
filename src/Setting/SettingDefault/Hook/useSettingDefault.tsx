import { atom, useAtom, useAtomValue } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//デフォルト属性のID
export const defaultAttributeIdAtom = atom("");


function useSettingDefault() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //デフォルト属性のID
    const defaultAttributeId = useAtomValue(defaultAttributeIdAtom);

    return { editMode, defaultAttributeId }

}

export default useSettingDefault;
