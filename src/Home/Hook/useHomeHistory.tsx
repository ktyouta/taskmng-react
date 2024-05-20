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


function useHomeHistory() {

    const [taskList, setTaskList] = useState<taskHistoryType[]>([]);

    //作業履歴リスト
    const {
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<taskHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`,
            afSuccessFn: (data: taskHistoryType[]) => {
                setTaskList(data);
            }
        }
    );

    return {
        isLoading: isLoading || isFetching,
        isError,
        taskList,
    };
}

export default useHomeHistory;