import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { memoListType, memoSearchConditionRefType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import MemoEditForm from "../MemoEditForm";
import { tabType } from "../../Common/TabComponent";
import React from "react";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import { createTabItems } from "../Function/MemoFunction";


//引数の型
type propsType = {
    memoSearchRefInfo: memoSearchConditionRefType,
    closeFn: () => void,
}


/**
 * useMemoConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoCondition(props: propsType) {

    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        props.closeFn();
    }

    //メモの検索条件画面
    let searchConditionComponent = useMemo(() => {
        if (!props.memoSearchRefInfo) {
            return;
        }

        return createTabItems(props.memoSearchRefInfo);
    }, [props.memoSearchRefInfo]);

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        //入力を初期化する
        Object.keys(props.memoSearchRefInfo).forEach((objKey) => {
            props.memoSearchRefInfo[objKey].forEach((element) => {
                element.ref.current?.clearValue();
            });
        });
    }

    return {
        negativeButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: props.memoSearchRefInfo && props.memoSearchRefInfo.default.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
        backPageButtonObj: {
            title: `閉じる`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        searchConditionComponent,
    }
}

export default useMemoCondition;