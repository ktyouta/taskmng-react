import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";
import useMemoEditCommon from "./useMemoEditCommon";


//引数の型
type propsType = {
    updMemoId: string,
    backFn?: () => void,
    closeFn?: () => void,
    memoTitle: string,
    memoContent: string,
    initMemoTitle: string | undefined,
    initMemoContent: string | undefined,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
}


/**
 * useMemoDraftコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoDraft(props: propsType) {

    const {
        delLoading,
        errMessage,
        setErrMessage,
        backPageButtonFunc,
        clearButtonFunc,
        deleteMemo,
    } = useMemoEditCommon({ ...props })

    return {
        errMessage,
    }
}

export default useMemoDraft;