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
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEdit(props: propsType) {

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");


    //更新用フック
    const updMutation = useMutationWrapper({
        url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
        method: "PUT",
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
     * 更新ボタン押下処理
     */
    const update = () => {
        //タイトル
        if (!props.memoTitle) {
            alert("タイトルを入力してください。");
            return;
        }

        //内容
        if (!props.memoContent || !props.memoContent.trim()) {
            alert("メモ内容を入力してください。");
            return;
        }

        if (!window.confirm('メモを更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        //リクエストボディ
        let body: memoUpdReqType = {
            title: props.memoTitle,
            content: props.memoContent,
        }
        //リクエストボディを作成
        updMutation.mutate(body);
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
        isUpDelLoading: updMutation.isLoading || delMutation.isLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        negativeButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: clearButtonFunc
        } as buttonObjType,
        deleteButtonObj: {
            title: `削除`,
            type: `DANGER`,
            onclick: deleteMemo
        } as buttonObjType,
        positiveButtonObj: {
            title: `更新`,
            type: `RUN`,
            onclick: update
        } as buttonObjType,
        errMessage,
    }
}

export default useMemoEdit;