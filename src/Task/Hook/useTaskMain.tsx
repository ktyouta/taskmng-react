import React, { RefObject, createRef, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import ENV from '../../env.json';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType, comboType, generalDataType, refInfoType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';
import useQueryClientWrapper from '../../Common/Hook/useQueryClientWrapper';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import useGetTaskInputSetting from './useGetTaskInputSetting';
import useSwitch from '../../Common/Hook/useSwitch';
import { orgTaskListAtom, taskListAtom } from '../Atom/TaskAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import { TASK_DISPLAY_NUM } from '../Const/TaskConst';
import { reqDelSelectedTaskType, reqRecSelectedTaskType } from '../Type/TaskType';
import { objectDeepCopy } from '../../Common/Function/Function';


function useTaskMain() {

    //削除対象のタスクIDリスト
    const [delTaskIdList, setDelTaskIdList] = useState<string[]>([]);
    //復元対象のタスクIDリスト
    const [recTaskIdList, setRecTaskIdList] = useState<string[]>([]);


    //削除用フック
    const delMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
        method: "DELETE",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });


    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKRECOVERY}`,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });


    /**
     * 削除対象のタスクを選択する
     */
    function checkDelTask(taskId: string) {

        setDelTaskIdList((prevDelTaskIdList) => {

            let tmpDelTaskIdList = [];

            // チェックを外す場合
            if (prevDelTaskIdList.some(e => e === taskId)) {
                tmpDelTaskIdList = prevDelTaskIdList.filter(e => e !== taskId);
            } else {
                tmpDelTaskIdList = [...prevDelTaskIdList, taskId];
            }

            return tmpDelTaskIdList;
        });
    }


    /**
     * 選択したタスクを削除
     */
    function deleteSelectedTasks() {

        //タスク未選択
        if (!delTaskIdList || delTaskIdList.length === 0) {
            alert("削除するタスクを選択してください");
            return;
        }

        //削除対象のタスクID
        let delTaskId = delTaskIdList.join("\r\n");

        if (!window.confirm(`選択したタスクを削除しますか？\r\n\r\削除対象タスク\r\n${delTaskId}`)) {
            return;
        }

        //リクエストボディ
        let reqBody: reqDelSelectedTaskType = {
            delTaskIdList: delTaskIdList
        };

        delMutation.mutate(reqBody);
    }


    /**
     * 復元対象のタスクを選択する
     */
    function checkRecTask(taskId: string) {

        setRecTaskIdList((prevRecTaskIdList) => {

            let tmpRecTaskIdList = [];

            // チェックを外す場合
            if (prevRecTaskIdList.some(e => e === taskId)) {
                tmpRecTaskIdList = prevRecTaskIdList.filter(e => e !== taskId);
            } else {
                tmpRecTaskIdList = [...prevRecTaskIdList, taskId];
            }

            return tmpRecTaskIdList;
        });
    }


    /**
     * 選択したタスクを復元
     */
    function recoverySelectedTasks() {

        //タスク未選択
        if (!recTaskIdList || recTaskIdList.length === 0) {
            alert("復元するタスクを選択してください");
            return;
        }

        //復元対象のタスクID
        let recTaskId = recTaskIdList.join("\r\n");

        if (!window.confirm(`選択したタスクを復元しますか？\r\n\r\復元対象タスク\r\n${recTaskId}`)) {
            return;
        }

        //リクエストボディ
        let reqBody: reqRecSelectedTaskType = {
            recTaskIdList: recTaskIdList
        };

        updMutation.mutate(reqBody);
    }

    return {
        checkDelTask,
        deleteSelectedTasks,
        delTaskIdList,
        checkRecTask,
        recoverySelectedTasks,
        recTaskIdList,
    }
}

export default useTaskMain;