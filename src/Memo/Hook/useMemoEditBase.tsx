import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";


//引数の型
type propsType = {
    memoTitle: string,
    memoContent: string,
    initMemoTitle: string | undefined,
    initMemoContent: string | undefined,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
}


/**
 * useMemoEditBaseコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEditBase(props: propsType) {

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");


    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (props.initMemoTitle === undefined) {
            return;
        }
        if (props.initMemoContent === undefined) {
            return;
        }
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        props.setMemoTitle(props.initMemoTitle);
        props.setMemoContent(props.initMemoContent);
    }


    return {
        errMessage,
        setErrMessage,
        clearButtonFunc,
    }
}

export default useMemoEditBase;