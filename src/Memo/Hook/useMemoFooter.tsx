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


function useMemoFooter() {

    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();

    return {
        isModalOpen,
        onFlag,
        offFlag,
    }
}

export default useMemoFooter;