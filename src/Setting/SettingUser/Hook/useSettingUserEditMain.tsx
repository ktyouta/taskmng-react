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


function useSettingUserEditMain() {

    //ユーザー画面の権限
    const settingUserAuthority = useAtomValue(settingUserAuthorityAtom);


    return {
        settingUserAuthority
    }

}

export default useSettingUserEditMain;
