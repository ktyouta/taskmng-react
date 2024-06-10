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
import { generalDataType } from '../../Common/Type/CommonType';
import { TASK_STATTUS_COMP, TASK_STATTUS_CORR, TASK_STATTUS_HOLD, TASK_STATTUS_NOCOMP, YEAR_ID } from '../Const/HomeConst';


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
}

function useHomeHistoryBarGraph(props: propsType) {

    //棒グラフ用のリストに変換
    const barTaskList = useMemo(() => {
        if (!props.taskList) {
            return [];
        }

        //月ごと集計する
        let taskTotalDatas = props.taskList.reduce((prev: barGraphTaskListType[], current: taskHistoryType) => {

            //作業日時を取得する
            let updDateSpList = current.time?.split("/");
            if (!updDateSpList || updDateSpList.length !== 3) {
                return prev;
            }

            //選択した年度に一致しない
            if (props.selectYear && props.selectYear !== updDateSpList[0]) {
                return prev;
            }

            let taskDateM = updDateSpList[1];
            //月の形式チェック
            if (!taskDateM || isNaN(Number(taskDateM))) {
                return prev;
            }

            //優先度
            let priority = current.priority;

            //月ごとに数を集計する
            let monthData = prev.find((element) => element.month === taskDateM);
            if (monthData) {
                switch (priority) {
                    case TASK_STATTUS_NOCOMP:
                        monthData.未対応++;
                        break;
                    case TASK_STATTUS_CORR:
                        monthData.対応中++;
                        break;
                    case TASK_STATTUS_HOLD:
                        monthData.保留++;
                        break;
                    case TASK_STATTUS_COMP:
                        monthData.完了++;
                        break;
                }
            }
            else {
                prev.push({
                    month: taskDateM,
                    未対応: priority === TASK_STATTUS_NOCOMP ? 1 : 0,
                    対応中: priority === TASK_STATTUS_CORR ? 1 : 0,
                    保留: priority === TASK_STATTUS_HOLD ? 1 : 0,
                    完了: priority === TASK_STATTUS_COMP ? 1 : 0,
                    name: ''
                });
            }

            return prev;
        }, []);

        for (let i = 1; i < 13; i++) {
            let monthData = taskTotalDatas.find((element) => {
                let month = element.month;
                if (month.startsWith("0")) {
                    month = month.slice(1);
                }
                return month === i.toString();
            });

            //月のデータが存在しない場合
            if (!monthData) {
                taskTotalDatas.push({
                    month: `${i.toString()}`,
                    未対応: 0,
                    対応中: 0,
                    保留: 0,
                    完了: 0,
                    name: ''
                });
                continue;
            }

            let month = monthData.month;
            if (month.startsWith("0")) {
                month = month.slice(1);
            }
            monthData.month = `${month.toString()}`;
        }

        //月でソートする
        taskTotalDatas.sort((a, b) => {
            return Number(a.month) - Number(b.month);
        });

        return taskTotalDatas;
    }, [props.taskList, props.selectYear]);

    return {
        barTaskList
    };
}

export default useHomeHistoryBarGraph;