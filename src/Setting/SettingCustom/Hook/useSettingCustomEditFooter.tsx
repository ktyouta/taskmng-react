import { useAtomValue } from "jotai";
import { settingCustomAuthorityAtom } from "../Atom/SettingCustomAtom";



function useSettingCustomEditFooter() {

    //カスタム属性画面の権限
    const settingCustomAttributeAuth = useAtomValue(settingCustomAuthorityAtom);


    return {
        settingCustomAttributeAuth
    }
}

export default useSettingCustomEditFooter;