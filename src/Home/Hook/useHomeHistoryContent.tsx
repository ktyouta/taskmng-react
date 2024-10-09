import React, { useContext, useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { useAtomValue, useSetAtom } from 'jotai';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { taskHistoryType } from '../Type/HomeType';
import { createTaskHistory, createTaskHistoryTable, filterTaskList } from '../Function/HomeFunction';
import { tableType } from '../../Common/Table';
import { userIdAtom } from '../../Setting/SettingUser/Atom/SettingUserAtom';
import { NOWPATH_STRAGEKEY, USER_PATH } from '../../Header/Const/HeaderConst';
import { useNavigate } from "react-router-dom";
import { USERID_STRAGEKEY } from '../../Common/Const/CommonConst';
import { moveUserInfo } from '../../Common/Function/Function';


//引数の型
type propsType = {
    userId: string,
}

function useHomeHistoryContent(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();

    //ユーザーアイコンのクリックイベント
    function clickIcon() {

        moveUserInfo(props.userId, navigate);
    }

    return {
        clickIcon
    };
}

export default useHomeHistoryContent;