import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { lineGraphTaskListType, taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';
import { generalDataType } from '../../Common/Type/CommonType';
import { EDIT_TYPE_ADD, EDIT_TYPE_DEL, EDIT_TYPE_UPD, YEAR_ID } from '../Const/HomeConst';


//引数の型
type propsType = {
    taskList: taskHistoryType[],
    selectYear: string,
}

function useHomeHistoryLineGraph(props: propsType) {

    //棒グラフ用のリストに変換
    const lineTaskList: lineGraphTaskListType[] = useMemo(() => {
        if (!props.taskList) {
            return [];
        }

        //月ごと集計する
        let taskTotalDatas = props.taskList.reduce((prev: lineGraphTaskListType[], current: taskHistoryType) => {

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

            //編集タイプ
            let editValue = current.editValue;

            //月ごとに数を集計する
            let monthData = prev.find((element) => element.name === taskDateM);
            if (monthData) {
                switch (editValue) {
                    case EDIT_TYPE_ADD:
                        monthData.登録数++;
                        break;
                    case EDIT_TYPE_UPD:
                        monthData.更新数++;
                        break;
                    case EDIT_TYPE_DEL:
                        monthData.削除数++;
                        break;
                }
                monthData.総数++;
            }
            else {
                prev.push({
                    name: taskDateM,
                    登録数: editValue === EDIT_TYPE_ADD ? 1 : 0,
                    更新数: editValue === EDIT_TYPE_UPD ? 1 : 0,
                    削除数: editValue === EDIT_TYPE_DEL ? 1 : 0,
                    総数: 1
                });
            }

            return prev;
        }, []);

        for (let i = 1; i < 13; i++) {
            let monthData = taskTotalDatas.find((element) => {
                let month = element.name;
                if (month.startsWith("0")) {
                    month = month.slice(1);
                }
                return month === i.toString();
            });

            //月のデータが存在しない場合
            if (!monthData) {
                taskTotalDatas.push({
                    name: `${i.toString()}`,
                    登録数: 0,
                    更新数: 0,
                    削除数: 0,
                    総数: 0
                });
                continue;
            }

            let month = monthData.name;
            if (month.startsWith("0")) {
                month = month.slice(1);
            }
            monthData.name = `${month.toString()}`;
        }

        //月でソートする
        taskTotalDatas.sort((a, b) => {
            return Number(a.name) - Number(b.name);
        });

        return taskTotalDatas;
    }, [props.taskList, props.selectYear]);

    return {
        lineTaskList
    };
}

export default useHomeHistoryLineGraph;