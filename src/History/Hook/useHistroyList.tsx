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


function useHistroyList() {

    //作業履歴リスト
    const {
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<taskHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`,
            afSuccessFn: (data: taskHistoryType[]) => {
                //取得したデータをテーブル用に変換
                setTableWorkHistoryList(createTaskHistoryTable(data));
            }
        }
    );

    //テーブル表示用作業履歴リスト
    const [tableWorkHistoryList, setTableWorkHistoryList] = useState<tableType>();

    return {
        tableWorkHistoryList,
        isLoading: isLoading || isFetching,
        isError,
    };
}

export default useHistroyList;