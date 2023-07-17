import { atom, useAtom, useAtomValue } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カスタム属性のID
export const customAttributeIdAtom = atom("");


function useSettingCustom() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);

    return { editMode, customAttributeId }

}

export default useSettingCustom;
