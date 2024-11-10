import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { memoRegistReqType, memoUpdReqType, viewMemoType } from "../Type/MemoType";
import useMemoEditCommon from "./useMemoEditCommon";
import useMemoRegisterCommon from "./useMemoRegisterCommon";
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
    initMemoTagList: tagType[],
    setMemoTagList: React.Dispatch<React.SetStateAction<tagType[]>>
}


/**
 * useMemoDraftコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoDraft(props: propsType) {

    //編集関連の共通処理を取得
    const {
        backPageButtonFunc,
        clearButtonFunc,
    } = useMemoEditCommon({ ...props });


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
     * 入力チェック
     */
    const inputCheck = () => {
        //タイトル
        if (!props.memoTitle) {
            alert("タイトルを入力してください。");
            return true;
        }

        //内容
        if (!props.memoContent || !props.memoContent.trim()) {
            alert("メモ内容を入力してください。");
            return true;
        }

        return false;
    }


    /**
     * 登録前チェック
     */
    const preCheck = (word: string) => {
        if (!window.confirm(`${word}`)) {
            return true;
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return true;
        }

        return false;
    }

    /**
     * リクエストボディの送信
     */
    const sendRequest = (status: string,) => {
        //リクエストボディ
        let body: memoRegistReqType = {
            title: props.memoTitle,
            content: props.memoContent,
            status: status,
            tagList: []
        }

        //リクエスト送信
        updMutation.mutate(body);
    }

    /**
     * 登録ボタン押下処理
     */
    const create = () => {
        //入力チェック
        if (inputCheck()) {
            return;
        }

        //リクエスト送信前チェック
        if (preCheck(`メモを登録しますか？`)) {
            return;
        }

        //リクエスト送信
        sendRequest(MEMO_STATUS.regist);
    }

    /**
     * 下書き保存ボタン押下処理
     */
    const save = () => {
        //入力チェック
        if (inputCheck()) {
            return;
        }

        //リクエスト送信前チェック
        if (preCheck(`下書きを保存しますか？`)) {
            return;
        }

        //リクエスト送信
        sendRequest(MEMO_STATUS.draft);
    }


    return {
        isCreateLoading: updMutation.isLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        createButtonObj: {
            title: `登録`,
            type: `GRAD_BLUE`,
            onclick: create
        } as buttonObjType,
        saveButtonObj: {
            title: `下書き保存`,
            type: `GRAD_BLUE`,
            onclick: save
        } as buttonObjType,
        clearButtonObj: {
            title: `元に戻す`,
            type: `GRAD_BLUE`,
            onclick: clearButtonFunc
        } as buttonObjType,
    }
}

export default useMemoDraft;