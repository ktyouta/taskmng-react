import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';
import { generalDataType } from '../../Common/Type/CommonType';
import { MAX_YEAR, MIN_YEAR, STATUS_ID, YEAR_ID } from '../Const/HomeConst';


//引数の型
type propsType = {
    taskList: taskHistoryType[]
}

function useHomeGraph(props: propsType) {

    //年のリスト
    const [yearList, setYearList] = useState<generalDataType[]>();
    //ステータスの選択値
    const [selectState, setSelectState] = useState<string>("");
    //ステータスのリスト
    const [stateList, setStateList] = useState<generalDataType[]>();

    //汎用リストを取得
    const {
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<generalDataType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
            afSuccessFn: (data: generalDataType[]) => {
                //年のリストをセット
                setYearList(data.filter((element) => {
                    return element.id === YEAR_ID && element.value >= MIN_YEAR && element.value <= MAX_YEAR;
                }));

                //ステータスのリストをセット
                let stateList = data.filter((element) => {
                    return element.id === STATUS_ID;
                });
                setStateList(stateList);

                //ステータスの初期値をセット
                setSelectState(stateList && stateList.length > 0 ? stateList[0].value : "");
            }
        }
    );

    return {
        yearList,
        selectState,
        setSelectState,
        stateList
    };
}

export default useHomeGraph;