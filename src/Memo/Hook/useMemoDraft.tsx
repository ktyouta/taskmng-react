import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";
import useMemoEditCommon from "./useMemoEditCommon";
import useMemoRegisterCommon from "./useMemoRegisterCommon";


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

    //編集関連の共通処理を取得
    const {
        delLoading,
        errMessage,
        setErrMessage,
        backPageButtonFunc,
        clearButtonFunc,
        deleteMemo,
    } = useMemoEditCommon({ ...props });

    //登録関連の共通処理を取得
    const {
        isRegistLoading,
        create,
        save,
    } = useMemoRegisterCommon({
        ...props,
        path: ""
    });


    return {
        isLoading: delLoading || isRegistLoading,
        errMessage,
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
        clearButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: clearButtonFunc
        } as buttonObjType,
    }
}

export default useMemoDraft;