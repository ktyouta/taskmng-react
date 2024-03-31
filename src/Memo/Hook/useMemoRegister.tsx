import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { memoRegistReqType } from "../Type/MemoType";
import { MEMO_STATUS } from "../Const/MemoConst";


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

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //メモタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモ内容
    const [memoContent, setMemoContent] = useState("");


    //登録用フック
    const registerMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            navigate(`${props.path}`);
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
        navigate(`${props.path}`);
    }

    /**
     * 入力チェック
     */
    const inputCheck = () => {
        //タイトル
        if (!memoTitle) {
            alert("タイトルを入力してください。");
            return true;
        }

        //内容
        if (!memoContent || !memoContent.trim()) {
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
        if (!registerMutation) {
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
            title: memoTitle,
            content: memoContent,
            status: status,
        }
        console.log(body);
        //リクエスト送信
        registerMutation.mutate(body);
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
        isRegistLoading: registerMutation.isLoading,
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