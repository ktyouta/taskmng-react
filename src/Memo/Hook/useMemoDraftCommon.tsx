import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";
import useMemoEditBase from "./useMemoEditBase";
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
 * useMemoDraftCommonコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoDraftCommon(props: propsType) {

    const {
        clearButtonFunc,
    } = useMemoEditCommon({ ...props });


    //削除用フック
    const delMutation = useMutationWrapper({
        url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
        method: "DELETE",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            if (props.closeFn) props.closeFn();
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });

    /**
     * 戻るボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.backFn) {
            props.backFn();
        }
    }


    /**
     * 削除ボタン押下処理
     */
    const deleteMemo = () => {
        if (!window.confirm('メモを削除しますか？')) {
            return
        }
        if (!delMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        delMutation.mutate();
    }


    return {
        delLoading: delMutation.isLoading,
        backPageButtonFunc,
        clearButtonFunc,
        deleteMemo,
    }
}

export default useMemoDraftCommon;