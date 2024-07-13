import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue, useSetAtom } from 'jotai';
import { userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable, filterTaskList } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';
import { userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { NOWPATH_STRAGEKEY, USER_PATH } from '../../Header/Const/HeaderConst';
import { useNavigate } from "react-router-dom";
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';


//引数の型
type propsType = {
    userId: string,
}

function useHomeHistoryContent(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();

    //ユーザーアイコンのクリックイベント
    function clickIcon() {
        //現在のパスを保持する
        let pathArray = window.location.pathname.split("/");
        if (pathArray.length > 1) {
            pathArray.splice(0, 1);
            let mainPath = pathArray.join("/");

            if (mainPath !== USER_PATH.replace('/', "")) {
                //現在のパスをローカルストレージに保存する
                localStorage.setItem(NOWPATH_STRAGEKEY, `/${mainPath}`);
            }
        }

        //ユーザーIDをストレージに保持する
        localStorage.setItem(USERID_STRAGEKEY, props.userId);
        navigate(USER_PATH);
    }

    return {
        clickIcon
    };
}

export default useHomeHistoryContent;