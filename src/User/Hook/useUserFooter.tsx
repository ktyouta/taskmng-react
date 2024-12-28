import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';
import { HOME_PATH, NOWPATH_STRAGEKEY } from '../../Header/Const/HeaderConst';
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';
import { userInfoAuthorityAtom } from '../Atom/UserAtom';
import { userAuthListAtom } from '../../Content/Atom/ContentAtom';
import useSetMenuAuthEffect from '../../Common/Hook/useSetMenuAuthEffect';


function useUserFooter() {

    //ユーザー情報画面の権限
    const userInfoAuthority = useAtomValue(userInfoAuthorityAtom);

    return {
        userInfoAuthority
    }
}

export default useUserFooter;
