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
import { HOME_PATH, NOWPATH_STRAGEKEY } from '../../Header/Const/HeaderConst';
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';


function useUser() {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ユーザーID
    const setUserId = useSetAtom(userIdAtom);
    //ルーティング用
    const navigate = useNavigate();

    useEffect(() => {
        //ローカルストレージからユーザーIDを取得する
        let userId = localStorage.getItem(USERID_STRAGEKEY);

        if (!userId) {
            //ローカルストレージから遷移前の画面のパスを取得する
            let nowPath = localStorage.getItem(NOWPATH_STRAGEKEY);
            if (!nowPath) {
                nowPath = HOME_PATH;
            }
            navigate(nowPath);
            alert("ユーザー情報を取得できませんでした。");
            return;
        }

        setUserId(userId);
        setEditMode(editModeEnum.update);
    }, []);

}

export default useUser;
