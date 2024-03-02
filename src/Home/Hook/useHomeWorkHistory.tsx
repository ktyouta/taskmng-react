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

    /**
     * タスク詳細のURLをクリップボードにコピー
     * @param url 
     */
    const copyUrlToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
            .then(function () {
                alert("URLをコピーしました。");
            }, function (err) {
                alert("URLのコピーに失敗しました。");
            });
    }

    return {
        isLoading: isLoading || isFetching,
        isError,
        workHistoryList,
        copyUrlToClipboard,
    };
}

export default useHomeWorkHistory;