import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskContentDisplayType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, moveUserInfo } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAtomValue } from "jotai";
import { taskAuthorityAtom } from "../Atom/TaskAtom";


//引数の型
type propsType = {
    contentObj: taskContentDisplayType,
    delTaskIdList: string[],
    recTaskIdList: string[],
}

/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskContent(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();
    //タスク画面の権限
    const taskAuthority = useAtomValue(taskAuthorityAtom);

    //ユーザー名のクリックイベント
    function clickUserNm() {

        moveUserInfo(props.contentObj.taskContent.userId, navigate);
    }

    /**
     * 削除対象タスクのチェック状態を取得
     */
    function getDelTaskCheck(taskId: string,) {

        return props.delTaskIdList.some(e => e === taskId);
    }

    /**
     * 復元対象タスクのチェック状態を取得
     */
    function getRecTaskCheck(taskId: string,) {

        return props.recTaskIdList.some(e => e === taskId);
    }

    return {
        clickUserNm,
        getDelTaskCheck,
        getRecTaskCheck,
        taskAuthority,
    }
}

export default useTaskContent;