import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { userType } from "../Type/SettingUserType";
import { editModeAtom, settingUserAuthorityAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../../Content/Atom/ContentAtom";
import useSwitch from "../../../Common/Hook/useSwitch";


function useSettingUserEditMain() {

    //ユーザー画面の権限
    const settingUserAuthority = useAtomValue(settingUserAuthorityAtom);
    //権限設定モーダルの開閉用フラグ
    const {
        flag: isAuthModalOpen,
        onFlag: openAuthModal,
        offFlag: closeAuthModal, } = useSwitch();

    return {
        settingUserAuthority,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
    }

}

export default useSettingUserEditMain;
