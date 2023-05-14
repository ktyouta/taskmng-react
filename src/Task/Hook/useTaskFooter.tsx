import React, { RefObject, useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { postJsonData } from '../../Common/Function/Function';
import ENV from '../../env.json';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { apiResponseType, generalDataType } from '../../Common/Type/CommonType';
import { refType } from '../../Common/BaseInputComponent';
import useMutationWrapper, { errResType, resType } from '../../Common/Hook/useMutationWrapper';
import useQueryClientWrapper from '../../Common/Hook/useQueryClientWrapper';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';


function useTaskFooter() {

    //登録するタスク内容
    const taskContentRef: RefObject<refType> = useRef(null);
    //優先度リストラジオボタン用リスト(優先度)
    const [priorityList, setPriorityList] = useState<generalDataType[]>([]);
    //登録する優先度
    const selectedPriorityRef: RefObject<refType> = useRef(null);
    //期限
    const limitDateRef: RefObject<refType> = useRef(null);
    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //ラジオボタン(優先度)リストを作成
    useEffect(() => {
        if (!generalDataList || generalDataList.length === 0) {
            return;
        }
        let tmp = generalDataList.filter((element) => {
            return element.id === "2";
        });
        setPriorityList(tmp);
    }, [generalDataList]);

    //登録用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            //navigate(`/master`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });

    /**
     * 登録
     */
    const create = () => {
        if (!window.confirm('タスクを登録しますか？')) {
            return
        }
        if (!mutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        let body: { [key: string]: string } = {};
        body[`content`] = taskContentRef.current ? taskContentRef.current.refValue : "";
        body[`priority`] = selectedPriorityRef.current ? selectedPriorityRef.current.refValue : "";
        body[`limitTime`] = limitDateRef.current ? limitDateRef.current.refValue : "";
        mutation.mutate(body);
    };

    /**
     * 入力値クリア
     */
    const clearButtonFunc = () => {
        if (!window.confirm(`入力を元に戻しますか？`)) {
            return;
        }
        taskContentRef.current?.clearValue();
        selectedPriorityRef.current?.clearValue();
        limitDateRef.current?.clearValue();
    };

    return {
        taskContentRef,
        selectedPriorityRef,
        limitDateRef,
        priorityList,
        create,
        clearButtonFunc,
        isLoading: mutation.isLoading,
    }
}

export default useTaskFooter;