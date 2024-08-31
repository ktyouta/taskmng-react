import useGetViewName from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';
import { LOGIN_PATH, NOWPATH_STRAGEKEY, USER_PATH } from '../Const/HeaderConst';
import useSwitch from '../../Common/Hook/useSwitch';
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';
import { clientMenuListAtom } from '../../Content/Atom/ContentAtom';


//引数の型
type propsType = {
    userInfo?: userInfoType,
}

function useHeader(props: propsType) {

    //認証クッキー
    const [cookie, , removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();
    //ナビゲーション表示フラグ
    const { flag, onFlag, offFlag } = useSwitch();

    /**
     * ログアウト
     */
    const logout = () => {
        Object.keys(cookie).forEach((key) => {
            removeCookie(key, { path: '/' });
        });
        navigate(LOGIN_PATH);
    }

    /**
     * ユーザー情報のクリックイベント
     */
    const clickUserInfo = () => {
        if (!props.userInfo) {
            alert("ユーザー情報画面にアクセスできません。");
            return;
        }

        //現在のパスを保持する
        let pathArray = window.location.pathname.split("/");
        if (pathArray.length > 1) {
            pathArray.splice(0, 1);
            let mainPath = pathArray.join("/");

            if (mainPath !== USER_PATH.replace('/', "")) {
                //現在のパスをローカルストレージに保存する
                localStorage.setItem(NOWPATH_STRAGEKEY, `/${mainPath}`);
            }
        }

        //ユーザーIDをストレージに保持する
        localStorage.setItem(USERID_STRAGEKEY, props.userInfo?.userId ?? "");
        offFlag();
        navigate(USER_PATH);
    };

    return {
        logout,
        flag,
        clickUserInfo,
        onFlag,
        offFlag
    };
}

export default useHeader;
