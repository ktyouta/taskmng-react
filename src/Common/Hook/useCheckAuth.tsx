import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Location, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { apiResponseType, reqUserInfoType, resUserInfoType } from '../Type/CommonType';
import { postJsonData } from '../Function/Function';
import ENV from '../../env.json';
import useQueryWrapper from './useQueryWrapper';
import useQueryAtom from './useQueryAtom';

//認証チェックAPIのレスポンスの型
type authResponseType = {
    errMessage?: string | undefined,
    userInfo?: {
        userId?: string | undefined;
        userName?: string | undefined;
        auth?: string | undefined;
    } | undefined;
}

/**
 * 取得したデータから画面用のユーザー情報を作成
 * @param data 
 * @returns 
 */
function createUserInfo(data: authResponseType): resUserInfoType {
    let userId = data.userInfo?.userId as string;
    let userName = data?.userInfo?.userName as string;
    let auth = data?.userInfo?.auth as string;
    return { userId: userId, userName: userName, auth: auth };
}


/**
 * 認証チェック
 * @param props 
 */
function useCheckAuth() {

    //認証クッキー
    const [cookie, , removeCookie] = useCookies();

    //認証チェックおよびユーザー情報の取得
    const {
        data: info,
        isError
    } = useQueryWrapper(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`,
            callback: createUserInfo,
            method: "POST",
            options: {
                cacheTime: 0
            }
        }
    );

    // //認証チェックおよびユーザー情報の取得
    // const {
    //     clientData: infosample,
    // } = useQueryAtom(
    //     {
    //         url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`,
    //         callback: createUserInfo,
    //         method: "POST",
    //         options: {
    //             cacheTime: 0
    //         }
    //     }
    // );


    //認証失敗
    if (isError) {
        Object.keys(cookie).forEach((key) => {
            removeCookie(key, { path: '/' });
        });
    }

    return { info };
}

export default useCheckAuth;