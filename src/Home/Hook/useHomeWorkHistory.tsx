import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
import { createTaskHistory } from '../Function/HomeFunction';


function useHomeWorkHistory() {

    //作業履歴リスト
    const {
        data: workHistoryList,
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<taskHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}`,
        }
    );

    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //画面表示用リストを作成する
    const workDisplayList: JSX.Element | JSX.Element[] | undefined = useMemo(() => {
        if (!userInfo) {
            return <React.Fragment></React.Fragment>;
        }
        if (!workHistoryList) {
            return <React.Fragment></React.Fragment>;
        }
        if (workHistoryList.length === 0) {
            return <div>作業履歴がありません。</div>
        }

        return createTaskHistory(userInfo, workHistoryList);
    }, [workHistoryList, userInfo]);

    return {
        workDisplayList,
        isLoading: isLoading || isFetching,
        isError
    };
}

export default useHomeWorkHistory;