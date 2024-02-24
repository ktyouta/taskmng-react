import { atom, useAtom, useAtomValue } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "../Atom/SettingCustomAtom";


function useSettingCustom() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);

    return { editMode, customAttributeId }

}

export default useSettingCustom;
