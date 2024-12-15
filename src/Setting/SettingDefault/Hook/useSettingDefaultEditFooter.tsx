import { useAtomValue } from "jotai";
import { settingDefaultAuthorityAtom } from "../Atom/SettingDefaultAtom";



function useSettingDefaultEditFooter() {

    //デフォルト属性画面の権限
    const settingDefalutAuth = useAtomValue(settingDefaultAuthorityAtom);


    return {
        settingDefalutAuth
    }
}

export default useSettingDefaultEditFooter;