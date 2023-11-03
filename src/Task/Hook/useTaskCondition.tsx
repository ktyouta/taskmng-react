import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createRequestBody } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";


//引数の型
type propsType = {
    refInfoArray: refConditionType[],
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

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        props.refInfoArray.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    return {
        negativeButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: props.refInfoArray && props.refInfoArray.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
        backPageButtonObj: {
            title: `閉じる`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
    }
}

export default useTaskCondition;