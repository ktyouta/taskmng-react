import React, { RefObject, useContext, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import ENV from '../../env.json';
import { reqLoginUserInfoType } from '../Type/LoginType';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';


function useLoginLogic() {

    //ユーザーID参照用
    const userIdRef: RefObject<refType> = useRef(null);
    //パスワード参照用
    const userPasswordRef: RefObject<refType> = useRef(null);
    //認証クッキー
    const [cookie, setCookie, removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();

    //postフック
    const postMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.LOGIN}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            //トークンをクッキーにセット
            setCookie(ENV.AUTHENTICATION.cookie, res.token, { path: '/' });
            navigate(`/`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            // クッキーを削除
            Object.keys(cookie).forEach((key) => {
                removeCookie(key, { path: '/' });
            });
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
            userPasswordRef.current?.clearValue();
        },
    });

    //エンターキー押下時イベント
    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            clickLoginBtn();
        }
    };

    /**
     * ログインボタン押下
     */
    function clickLoginBtn() {
        //ユーザーID未入力
        if (!userIdRef.current?.refValue) {
            alert("ユーザーIDが未入力です。");
            return;
        }
        //パスワード未入力
        if (!userPasswordRef.current?.refValue) {
            alert("パスワードが未入力です。");
            return;
        }
        let userId = userIdRef.current?.refValue as string;
        let password = userPasswordRef.current?.refValue as string;
        let body: reqLoginUserInfoType = { userId, password }
        //認証API呼び出し
        postMutation.mutate(body);
    }

    /**
     * 入力値のクリア
     */
    function clickClearBtn() {
        userIdRef.current?.clearValue();
        userPasswordRef.current?.clearValue();
    }

    return {
        userIdRef,
        userPasswordRef,
        clickLoginBtn,
        clickClearBtn,
        handleKeyPress,
    }
}

export default useLoginLogic;