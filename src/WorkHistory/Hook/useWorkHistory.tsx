import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue } from 'jotai';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { workHistoryType } from '../Type/WorkHistoryType';
import { userInfoAtom } from '../../Content/Atom/ContentAtom';


function useWorkHistory() {

    //作業履歴リスト
    const {
        data: workHistoryList,
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper<workHistoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.WORKHISTORY}`,
        }
    );

    //画面表示用リストを作成する
    const workDisplayList: JSX.Element | JSX.Element[] | undefined = useMemo(() => {
        let tmpWorkDisplayList: JSX.Element[] = [];
        if (!workHistoryList) {
            return <React.Fragment></React.Fragment>;
        }
        if (workHistoryList.length === 0) {
            return <div>作業履歴がありません。</div>
        }
        tmpWorkDisplayList = workHistoryList.map((element: workHistoryType) => {
            let history = `${element.time}　${element.editMaster}`;
            switch (element.editType) {
                case "1":
                    history += `　登録`;
                    break;
                case "2":
                    history += `　更新`;
                    break;
                case "3":
                    history += `　削除`;
                    break;
            }

            let key = `${Object.values(element).join("-")}`;
            return (
                <li key={key}>
                    {history}
                </li>
            );
        });
        return tmpWorkDisplayList;
    }, [workHistoryList]);

    return { workDisplayList, isLoading: isLoading || isFetching, isError };
}

export default useWorkHistory;