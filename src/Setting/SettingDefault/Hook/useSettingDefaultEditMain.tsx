import { useAtomValue } from "jotai";
import { settingDefaultAuthorityAtom } from "../Atom/SettingDefaultAtom";
import { useMemo } from "react";
import { checkAuthAction } from "../../../Common/Function/Function";
import { USER_AUTH } from "../../../Common/Const/CommonConst";



function useSettingDefaultEditMain() {

    //デフォルト属性画面の権限
    const settingDefalutAuth = useAtomValue(settingDefaultAuthorityAtom);


    //管理者権限以上の編集可能フラグ
    const isEditableAuth = useMemo(() => {

        return checkAuthAction(settingDefalutAuth, USER_AUTH.ADMIN);
    }, [settingDefalutAuth]);


    return {
        settingDefalutAuth,
        isEditableAuth,
    }
}

export default useSettingDefaultEditMain;