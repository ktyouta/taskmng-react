import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";


//引数の型
type propsType = {
    memoSearchRefInfo: refInfoType[],
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

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        //入力を初期化する
        props.memoSearchRefInfo.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    return {
        negativeButtonObj: {
            title: `元に戻す`,
            type: `GRAD_BLUE`,
            onclick: props.memoSearchRefInfo && props.memoSearchRefInfo.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
        backPageButtonObj: {
            title: `閉じる`,
            type: `GRAD_GRAY`,
            onclick: backPageButtonFunc
        } as buttonObjType,
    }
}

export default useMemoCondition;