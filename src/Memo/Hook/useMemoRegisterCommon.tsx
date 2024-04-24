import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { memoRegistReqType } from "../Type/MemoType";
import { MEMO_STATUS, TAG_MAX_SETTINGNUM } from "../Const/MemoConst";
import useMemoEditBase from "./useMemoEditBase";
import { tagType } from "../../Common/TagsComponent";


//引数の型
type propsType = {
    path: string,
    memoTitle: string,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    memoContent: string,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
    memoTagList: tagType[],
    setMemoTagList: React.Dispatch<React.SetStateAction<tagType[]>>,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoRegister(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();


    const {
        clearButtonFunc,
    } = useMemoEditBase({
        ...props,
        initMemoTitle: "",
        initMemoContent: ""
    });


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
            alert(res.response.data.errMessage);
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
        if (!props.memoTitle) {
            alert("タイトルを入力してください。");
            return true;
        }

        //内容
        if (!props.memoContent || !props.memoContent.trim()) {
            alert("メモ内容を入力してください。");
            return true;
        }

        //タグ
        if (!props.memoTagList || props.memoTagList.length === 0) {
            alert("タグを一つ以上設定してください");
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
            title: props.memoTitle,
            content: props.memoContent,
            status: status,
            tagList: props.memoTagList
        }

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

    /**
     * タグの追加イベント
     */
    const addTag = (newTag: tagType) => {
        //同名のタグは設定不可
        if (props.memoTagList.find((element) => {
            return element.label === newTag.label;
        })) {
            alert("同名のタグは設定できません。");
            return;
        }

        if (props.memoTagList.length >= TAG_MAX_SETTINGNUM) {
            alert("タグの最大設定可能数は5個です。");
            return;
        }

        props.setMemoTagList([...props.memoTagList, { label: newTag.label.trim(), value: "" }]);
    };

    /**
     * タグの削除イベント
     */
    const deleteTag = (tagIndex: number) => {
        props.setMemoTagList(props.memoTagList.filter((_, i) => i !== tagIndex))
    }

    return {
        isRegistLoading: registerMutation.isLoading,
        backPageButtonFunc,
        create,
        save,
        clearButtonFunc,
        addTag,
        deleteTag
    }
}

export default useMemoRegister;