import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import { workHistoryType } from '../WorkHistory';
import { userInfoContext } from '../../Content/Content';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';


function useWorkHistory() {

    //作業履歴リスト
    const {
        data: workHistoryList,
        isLoading,
        isFetching,
        isError
    } = useQueryWrapper(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.WORKHISTORY}`,
            callback: selectData,
        }
    );

    /**
     * useQueryで取得したデータを加工
     * @param data 
     * @returns 
     */
    function selectData(data: workHistoryType[]) {
        return data;
    }

    //ユーザー情報
    const { userInfo } = useContext(userInfoContext);

    //画面表示用リストを作成する
    const workDisplayList: JSX.Element | JSX.Element[] | undefined = useMemo(() => {
        let tmpWorkDisplayList: JSX.Element[] = [];
        if (!userInfo) {
            return <React.Fragment></React.Fragment>;
        }
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
            switch (userInfo.auth) {
                case "3":
                    history += `　　作業ユーザー：${element.userName}`;
                    break;
                case "2":
                    history += `　　作業ユーザー：${element.userName}`;
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
    }, [workHistoryList, userInfo]);

    return { workDisplayList, isLoading: isLoading || isFetching, isError };
}

export default useWorkHistory;