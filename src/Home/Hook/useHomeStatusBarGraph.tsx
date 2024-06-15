import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { barGraphTaskPriorityListType, barGraphTaskStatusListType, taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';
import { generalDataType } from '../../Common/Type/CommonType';
import { TASK_PRIORITY_HIGH, TASK_PRIORITY_LOW, TASK_PRIORITY_MID, TASK_STATTUS_COMP, TASK_STATTUS_CORR, TASK_STATTUS_HOLD, TASK_STATTUS_NOCOMP, YEAR_ID } from '../Const/HomeConst';


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
    selectState: string,
}

function useHomeStatusBarGraph(props: propsType) {

    //棒グラフ用のリストに変換
    const barTaskList = useMemo(() => {
        if (!props.taskList) {
            return [];
        }

        let priotiryObj: barGraphTaskStatusListType = {
            name: '状態',
            未対応: 0,
            対応中: 0,
            保留: 0,
            完了: 0
        };

        props.taskList.forEach((element) => {

            //作業日時を取得する
            let updDateSpList = element.time?.split("/");
            if (!updDateSpList || updDateSpList.length !== 3) {
                return;
            }

            //選択した年度に一致しない
            if (props.selectYear && props.selectYear !== updDateSpList[0]) {
                return;
            }

            //状態
            let status = element.status;

            switch (status) {
                case TASK_STATTUS_NOCOMP:
                    priotiryObj.未対応++;
                    break;
                case TASK_STATTUS_CORR:
                    priotiryObj.対応中++;
                    break;
                case TASK_STATTUS_HOLD:
                    priotiryObj.保留++;
                    break;
                case TASK_STATTUS_COMP:
                    priotiryObj.完了++;
                    break;
            }
        });

        return [priotiryObj];
    }, [props.taskList, props.selectYear, props.selectState]);

    return {
        barTaskList
    };
}

export default useHomeStatusBarGraph;