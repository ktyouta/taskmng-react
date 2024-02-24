import { atom, useAtom, useAtomValue } from "jotai";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";


function useSettingUser() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ユーザーのID
    const userId = useAtomValue(userIdAtom);

    return { editMode, userId }

}

export default useSettingUser;
