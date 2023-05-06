import React, { RefObject, useContext, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { postJsonData } from '../../Common/Function/Function';
import ENV from '../../env.json';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';


function useTaskFooter() {

    //ルーティング用
    const navigate = useNavigate();
    //登録するタスク内容
    const taskContentRef: RefObject<refType> = useRef(null);

    //登録用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTER}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            navigate(`/master`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
        },
    });

    /**
     * 登録
     */
    const create = () => {

    };

    /**
     * 入力値クリア
     */
    const clearButtonFunc = () => {

    };

    return { taskContentRef, create, clearButtonFunc }
}

export default useTaskFooter;