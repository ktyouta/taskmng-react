import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { memoRegistReqType } from "../Type/MemoType";
import { MEMO_STATUS } from "../Const/MemoConst";
import useMemoRegisterCommon from "./useMemoRegisterCommon";


//引数の型
type propsType = {
    path: string,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoRegister(props: propsType) {

    const {
        isRegistLoading,
        backPageButtonFunc,
        create,
        save,
        errMessage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
    } = useMemoRegisterCommon({ ...props });

    return {
        isRegistLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        positiveButtonObj: {
            title: `登録`,
            type: `RUN`,
            onclick: create
        } as buttonObjType,
        saveButtonObj: {
            title: `下書き保存`,
            type: `RUN`,
            onclick: save
        } as buttonObjType,
        errMessage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
    }
}

export default useMemoRegister;