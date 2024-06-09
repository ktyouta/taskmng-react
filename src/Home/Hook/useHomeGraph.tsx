import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
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
    const [selectYear, setSelectYear] = useState(new Date().getFullYear().toString());
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
                setYearList(data.filter((element) => {
                    return element.id === YEAR_ID;
                }));
            }
        }
    );

    return {
        selectYear,
        yearList,
        setSelectYear
    };
}

export default useHomeGraph;