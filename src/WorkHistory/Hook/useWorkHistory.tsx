import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import { workHistoryType } from '../WorkHistory';
import { userInfoContext } from '../../Content/Content';


function useWorkHistory() {

    //作業履歴リスト
    const workHistoryList: workHistoryType[] = useFetchJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.WORKHISTORY}`).history;
    //作業履歴表示用リスト
    const [workDisplayList, setWorkDisplayList] = useState<string[]>([]);
    //ユーザー情報
    const { userInfo } = useContext(userInfoContext);

    //画面表示用リストを作成する
    useEffect(() => {
        let tmpWorkDisplayList: string[] = [];
        if (!userInfo) {
            return;
        }
        if (!workHistoryList || workHistoryList.length < 1) {
            return;
        }
        tmpWorkDisplayList = workHistoryList.map((element) => {
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
            return history;
        });
        setWorkDisplayList(tmpWorkDisplayList);
    }, [workHistoryList, userInfo]);

    return { workDisplayList };
}

export default useWorkHistory;