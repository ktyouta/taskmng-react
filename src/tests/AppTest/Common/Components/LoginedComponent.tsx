import React, { ReactNode, useEffect } from "react";
import { useGlobalAtom, useSetGlobalAtom } from "../../../../Common/Hook/useGlobalAtom";
import { userInfoType } from "../../../../Common/Type/CommonType";
import ENV from "../../../../env.json";
import { useCookies } from "react-cookie";
import { clientMenuListAtom, userInfoAtom } from "../../../../Content/Atom/ContentAtom";
import { userInfo } from "../../TestDatas";
import CATEGORY_INFO from '../../../../../public/json/setting/menu.json';

//引数の型
type propsType = {
    children: ReactNode
}

/**
 * ログイン時にAPIから取得するデータを保持するコンポーネント
 * ログイン後のコンポーネントに対してテストする際に使用する
 * @param props 
 * @returns 
 */
function LoginedComponent(props: propsType) {

    //認証クッキー
    const [cookie, setCookie, removeCookie] = useCookies();
    // ユーザー情報
    const setUserInfoAtom = useSetGlobalAtom<userInfoType | undefined>(userInfoAtom);
    //クライアント用メニューリスト
    const setClientMenuList = useSetGlobalAtom(clientMenuListAtom);

    useEffect(() => {

        //cookieを設定
        setCookie(ENV.AUTHENTICATION.cookie, "testtoken", { path: '/' });

        //ユーザー情報を設定
        setUserInfoAtom(userInfo);

        //カテゴリ情報を設定
        setClientMenuList(CATEGORY_INFO);

    }, []);

    return (
        <React.Fragment>
            {props.children}
        </React.Fragment>
    );
}

export default LoginedComponent;