import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { memoUpdReqType, viewMemoType } from "../Type/MemoType";
import useMemoEditCommon from "./useMemoEditCommon";
import { MEMO_STATUS } from "../Const/MemoConst";
import { tagType } from "../../Common/TagsComponent";


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
    memoTagList: tagType[],
    initMemoTagList: tagType[],
    setMemoTagList: React.Dispatch<React.SetStateAction<tagType[]>>
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEdit(props: propsType) {

    //編集関連の共通処理を取得
    const {
        delLoading,
        backPageButtonFunc,
        clearButtonFunc,
        deleteMemo,
    } = useMemoEditCommon({ ...props })


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
            alert(res.response.data.errMessage);
        },
    });


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
            status: MEMO_STATUS.regist,
            tagList: props.memoTagList,
        }
        //リクエストボディを作成
        updMutation.mutate(body);
    }


    return {
        isUpDelLoading: updMutation.isLoading || delLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `GRAD_GRAY`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        negativeButtonObj: {
            title: `元に戻す`,
            type: `GRAD_BLUE`,
            onclick: clearButtonFunc
        } as buttonObjType,
        deleteButtonObj: {
            title: `削除`,
            type: `GRAD_RED`,
            onclick: deleteMemo
        } as buttonObjType,
        positiveButtonObj: {
            title: `更新`,
            type: `GRAD_BLUE`,
            onclick: update
        } as buttonObjType,
    }
}

export default useMemoEdit;