import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskListType, taskSearchConditionRefType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import TaskEditForm from "../TaskEditForm";
import { tabType } from "../../Common/TabComponent";
import React from "react";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import { createTabItems } from "../Function/TaskFunction";


//引数の型
type propsType = {
    taskSearchRefInfo: taskSearchConditionRefType,
    closeFn: () => void,
}


/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskCondition(props: propsType) {

    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        props.closeFn();
    }

    //タスクの検索条件画面
    let searchConditionComponent = useMemo(() => {
        if (!props.taskSearchRefInfo) {
            return;
        }

        return createTabItems(props.taskSearchRefInfo);
    }, [props.taskSearchRefInfo]);

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("検索条件を元に戻しますか？")) {
            return;
        }
        //入力を初期化する
        Object.keys(props.taskSearchRefInfo).forEach((objKey) => {
            props.taskSearchRefInfo[objKey].forEach((element) => {
                element.ref.current?.clearValue();
            });
        });
    }

    return {
        negativeButtonObj: {
            title: `条件を設定して閉じる`,
            type: `GRAD_BLUE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        backPageButtonObj: {
            title: `リセット`,
            type: `GRAD_GRAY`,
            onclick: props.taskSearchRefInfo && props.taskSearchRefInfo.default.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
        searchConditionComponent,
        backPageButtonFunc,
    }
}

export default useTaskCondition;