import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { userType } from "../Type/SettingUserType";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../../Content/Hook/useContentLogic";


function useSettingUserEditMain() {

    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    return {
        userInfo
    }

}

export default useSettingUserEditMain;
