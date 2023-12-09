import { atom, useAtom, useAtomValue } from "jotai";

//詳細画面へのルーティング用ID
export const editModeAtom = atom(0);
//カスタム属性のID
export const userIdAtom = atom("");


function useSettingUser() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //ユーザーのID
    const userId = useAtomValue(userIdAtom);

    return { editMode, userId }

}

export default useSettingUser;
