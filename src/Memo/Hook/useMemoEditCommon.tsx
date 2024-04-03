import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";


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
 * useMemoEditCommonコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEditCommon(props: propsType) {

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");

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
            setErrMessage(res.response.data.errMessage);
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
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!props.initMemoTitle || !props.initMemoContent) {
            return;
        }
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        props.setMemoTitle(props.initMemoTitle);
        props.setMemoContent(props.initMemoContent);
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
        errMessage,
        setErrMessage,
        backPageButtonFunc,
        clearButtonFunc,
        deleteMemo,
    }
}

export default useMemoEditCommon;