import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { barGraphTaskListType, taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';


//引数の型
type propsType = {
    taskList: taskHistoryType[]
}

function useHomeHistoryBarGraph(props: propsType) {

    //年度
    const [selectYear, setSelectYear] = useState("");

    //棒グラフ用のリストに変換
    const barTaskList = useMemo(() => {
        if (!props.taskList) {
            return [];
        }

        //月ごとにまとめる
        return props.taskList.reduce((prev: barGraphTaskListType[], current: taskHistoryType) => {
            let updDateSpList = current.time?.split("/");
            if (!updDateSpList || updDateSpList.length !== 3) {
                return prev;
            }

            //選択した年度に一致しない
            if (selectYear && selectYear !== updDateSpList[0]) {
                return prev;
            }

            return prev;
        }, []);
    }, [props.taskList, selectYear]);

    return {
        barTaskList
    };
}

export default useHomeHistoryBarGraph;