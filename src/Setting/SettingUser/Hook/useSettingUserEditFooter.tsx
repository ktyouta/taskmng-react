import { useAtomValue } from "jotai";
import { settingUserAuthorityAtom } from "../Atom/SettingUserAtom";



function useSettingUserEditFooter() {

    //ユーザー設定画面の権限
    const settingUserAuth = useAtomValue(settingUserAuthorityAtom);


    return {
        settingUserAuth
    }
}

export default useSettingUserEditFooter;