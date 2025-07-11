import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { Location, useLocation } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { apiResponseType, reqUserInfoType, resUserInfoType } from '../Type/CommonType';
import ENV from '../../env.json';
import useQueryWrapper from './useQueryWrapper';
import useQueryAtom from './useQueryAtom';

//権限データ
export type authType = {
    userId: string,
    menuId: string,
    auth: string,
}

//認証チェックAPIのレスポンスの型
type authResponseType = {
    errMessage?: string,
    userInfo?: {
        userId?: string;
        userName?: string;
        iconUrl?: string,
        authList: authType[]
    };
}

/**
 * 取得したデータから画面用のユーザー情報を作成
 * @param data 
 * @returns 
 */
function createUserInfo(data: authResponseType): resUserInfoType {
    let userId = data.userInfo?.userId as string;
    let userName = data?.userInfo?.userName as string;
    let iconUrl = data?.userInfo?.iconUrl as string;
    let authList = data?.userInfo?.authList as authType[];

    return {
        userId,
        userName,
        iconUrl,
        authList,
    };
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
        // クッキーを削除
        Object.keys(cookie).forEach((key) => {
            removeCookie(key, { path: '/' });
        });
    }

    return { info };
}

export default useCheckAuth;