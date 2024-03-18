import useGetViewName from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { useAtomValue, useSetAtom } from 'jotai';
import { clientMenuListAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useState } from 'react';
import { editModeAtom, userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { editModeEnum } from '../../Setting/Const/SettingConst';
import { userInfoType } from '../../Common/Type/CommonType';
import { LOGIN_PATH, NOWPATH_STRAGEKEY, USER_PATH } from '../Const/HeaderConst';


//引数の型
type propsType = {
    userInfo: userInfoType | undefined,
}

function useHeader(props: propsType) {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);

    //ヘッダタイトル
    const [headerTile] = useGetViewName({ menu });
    //認証クッキー
    const [cookie, , removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();
    //ナビゲーション表示フラグ
    const [isDisplayNavi, setIsDisplayNavi] = useState(false);

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
     * ナビゲーションを表示する
     */
    const displayNavi = () => {
        setIsDisplayNavi(true);
    }

    /**
     * ナビゲーションを非表示にする
     */
    const hidDisplayNavi = () => {
        setIsDisplayNavi(false);
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
            //現在のパスをローカルストレージに保存する
            localStorage.setItem(NOWPATH_STRAGEKEY, `/${mainPath}`);
        }
        navigate(USER_PATH);
    };

    return {
        headerTile,
        logout,
        isDisplayNavi,
        displayNavi,
        hidDisplayNavi,
        clickUserInfo,
    };
}

export default useHeader;
