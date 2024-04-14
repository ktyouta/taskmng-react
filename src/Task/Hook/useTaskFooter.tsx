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
import useGetTaskInputSetting from './useGetTaskInputSetting';
import useSwitch from '../../Common/Hook/useSwitch';
import { orgTaskListAtom, taskListAtom } from '../Atom/TaskAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { TASK_DISPLAY_NUM } from '../Const/TaskConst';


function useTaskFooter() {

    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //APIから取得したメモリスト
    const orgTaskList = useAtomValue(orgTaskListAtom);
    //メモリスト
    const setTaskList = useSetAtom(taskListAtom);


    /**
     * ページの切り替えイベント
     */
    const changePage = (nowPage: number) => {
        if (!orgTaskList) {
            return;
        }

        let tmpOrgMemoList = JSON.parse(JSON.stringify(orgTaskList));
        setTaskList(tmpOrgMemoList.slice(nowPage * TASK_DISPLAY_NUM, nowPage * TASK_DISPLAY_NUM + TASK_DISPLAY_NUM));
    };

    return {
        isModalOpen,
        onFlag,
        offFlag,
        pageNum: orgTaskList ?
            orgTaskList.length / TASK_DISPLAY_NUM
            : 0,
        changePage
    }
}

export default useTaskFooter;