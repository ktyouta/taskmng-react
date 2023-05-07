import React, { RefObject, useContext, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { postJsonData } from '../../Common/Function/Function';
import ENV from '../../env.json';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';
import { PRIORITY_URL } from '../Task';
import { generalDataType } from '../Type/TaskType';


function useTaskFooter() {

    //登録するタスク内容
    const taskContentRef: RefObject<refType> = useRef(null);
    //優先度リストラジオボタン用リスト(優先度)
    const priorityList = useQueryClientWapper<generalDataType[]>(PRIORITY_URL);
    //登録する優先度
    const selectedPriorityRef: RefObject<refType> = useRef(null);


    //登録用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTER}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            //navigate(`/master`);
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
        taskContentRef.current?.clearValue();
        selectedPriorityRef.current?.clearValue();
    };

    return {
        taskContentRef,
        selectedPriorityRef,
        priorityList,
        create,
        clearButtonFunc,

    }
}

export default useTaskFooter;