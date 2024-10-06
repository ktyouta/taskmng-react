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
            title: `条件を設定して閉じる`,
            type: `GRAD_BLUE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        backPageButtonObj: {
            title: `リセット`,
            type: `GRAD_GRAY`,
            onclick: props.memoSearchRefInfo && props.memoSearchRefInfo.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
    }
}

export default useMemoCondition;