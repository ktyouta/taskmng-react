import { atom, useAtom, useAtomValue } from "jotai";
import { defaultAttributeIdAtom, editModeAtom } from "../Atom/SettingDefaultAtom";


function useSettingDefault() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //デフォルト属性のID
    const defaultAttributeId = useAtomValue(defaultAttributeIdAtom);

    return { editMode, defaultAttributeId }

}

export default useSettingDefault;
