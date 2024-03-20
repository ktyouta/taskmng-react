import React, { RefObject, createRef, useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import ENV from '../../env.json';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType, comboType, generalDataType, refInfoType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';
import useQueryClientWrapper from '../../Common/Hook/useQueryClientWrapper';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import useGetMemoInputSetting from './useGetMemoInputSetting';
import useSwitch from '../../Common/Hook/useSwitch';
import { MEMO_EDIT_PATH } from '../Const/MemoConst';


//引数の型
type propsType = {
    path: string,
}

function useMemoFooter(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();

    /**
     * メモ作成ボタン押下イベント
     */
    const clickCreateBtn = () => {
        navigate(`${props.path}/${MEMO_EDIT_PATH}`);
    };

    return {
        clickCreateBtn
    }
}

export default useMemoFooter;