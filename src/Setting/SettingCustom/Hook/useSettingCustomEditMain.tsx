import { useAtomValue } from "jotai";
import { settingCustomAuthorityAtom } from "../Atom/SettingCustomAtom";
import { useMemo } from "react";
import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { checkAuthAction } from "../../../Common/Function/Function";



function useSettingCustomEditMain() {

    //カスタム属性画面の権限
    const settingCustomAttributeAuth = useAtomValue(settingCustomAuthorityAtom);


    //管理者権限以上の編集可能フラグ
    const isEditableAuth = useMemo(() => {

        return checkAuthAction(settingCustomAttributeAuth, USER_AUTH.ADMIN);
    }, [settingCustomAttributeAuth]);


    return {
        settingCustomAttributeAuth,
        isEditableAuth
    }
}

export default useSettingCustomEditMain;