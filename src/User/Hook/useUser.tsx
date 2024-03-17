import useGetViewName from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { clientMenuListAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';


//引数の型
type propsType = {
    userInfo: userInfoType | undefined,
}

function useUser(props: propsType) {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ユーザーID
    const setUserId = useSetAtom(userIdAtom);

    useEffect(() => {
        setUserId(props.userInfo?.userId ?? "");
        setEditMode(editModeEnum.update);
    }, []);


}

export default useUser;
