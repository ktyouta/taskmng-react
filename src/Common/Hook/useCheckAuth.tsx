import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Location, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { apiResponseType, reqUserInfoType, resUserInfoType } from '../Type/CommonType';
import { postJsonData } from '../Function/Function';
import ENV from '../../env.json';


/**
 * 認証チェック
 * @param props 
 */
function useCheckAuth() {

    //認証クッキー
    const [cookie, , removeCookie] = useCookies();
    //ユーザー情報
    const [userInfo, setUserInfo] = useState<resUserInfoType | null>(null)

    /**
     * 認証チェック
     */
    const checkUserInfo = () => {
        //認証API呼び出し
        postJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`, cookie[ENV.AUTHENTICATION.cookie], {}, checkAuth);
    }

    /**
     * 認証チェック後処理
     */
    const checkAuth = (data: apiResponseType) => {
        //認証に失敗した場合は、クッキーの情報を削除
        if (data.status !== 200) {
            removeCookie(ENV.AUTHENTICATION.cookie);
        }
        let userId = data.json?.userInfo?.userId as string;
        let userName = data.json?.userInfo?.userName as string;
        let auth = data.json?.userInfo?.auth as string;
        //ユーザー情報をセット
        if(!userInfo){
            setUserInfo({ userId: userId, userName: userName, auth: auth });
        }
    }

    //マウント、アンマウント時に認証チェック
    useEffect(() => {
        return ()=> checkUserInfo();
    }, []);

    return { userInfo };

}

export default useCheckAuth;