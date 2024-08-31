import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable, filterTaskList } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';


function useHomeHistory() {

    //作業履歴リスト
    const [taskList, setTaskList] = useState<taskHistoryType[]>([]);
    //APIから取得した作業履歴リスト
    const [orgTaskList, setOrgTaskList] = useState<taskHistoryType[]>([]);
    //年の選択値
    const [selectYear, setSelectYear] = useState(new Date().getFullYear().toString());

    //作業履歴リスト
    const {
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<taskHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`,
            afSuccessFn: (data: taskHistoryType[]) => {
                setOrgTaskList(data);
                setTaskList(filterTaskList(data, selectYear));
            }
        }
    );

    useEffect(() => {
        setTaskList(filterTaskList(orgTaskList, selectYear));
    }, [selectYear]);

    return {
        isLoading: isLoading || isFetching,
        isError,
        taskList,
        selectYear,
        setSelectYear,
        orgTaskList,
        setOrgTaskList,
    };
}

export default useHomeHistory;