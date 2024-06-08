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
import { YEAR_ID } from '../Const/HomeConst';


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
}

function useHomeHistoryLineGraph(props: propsType) {

    //状態区分
    const [taskStatus, setTaskStatsu] = useState<string>("");

    //棒グラフ用のリストに変換
    const lineTaskList: barGraphTaskListType[] = useMemo(() => {
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

            //月ごとに数を集計する
            let monthData = prev.find((element) => element.month === taskDateM);
            if (monthData) {
                monthData.value++;
            }
            else {
                prev.push({
                    month: taskDateM,
                    value: 1
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
                    value: 0
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
        lineTaskList
    };
}

export default useHomeHistoryLineGraph;