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
    taskList: taskHistoryType[]
}

function useHomeGraph(props: propsType) {

    //年の選択値
    const [selectYear, setSelectYear] = useState("");
    //年のリスト
    const [yearList, setYearList] = useState<generalDataType[]>();

    //年のリストを取得
    const {
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<generalDataType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}?id=${YEAR_ID}`,
            afSuccessFn: (data: generalDataType[]) => {
                setYearList(data);
            }
        }
    );

    //棒グラフ用のリストに変換
    const taskGraphDatas = useMemo(() => {
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

            prev.push({
                month: updDateSpList[1],
                value: 1
            });

            return prev;
        }, []);
    }, [props.taskList, selectYear]);

    return {
        taskGraphDatas
    };
}

export default useHomeGraph;