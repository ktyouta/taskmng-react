import { useEffect, useState } from "react";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultMemoUrlCondition from "./useCreateDefaultMemoUrlCondition";
import { useNavigate } from "react-router-dom";
import { memoSearchConditionType } from "../Type/MemoType";
import { detailRoutingIdAtom } from "../Atom/MemoAtom";
import { DUMMY_ID, PRE_MEMO_ID, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../Const/MemoConst";


//引数の型
type propsType = {
    path: string
}


/**
 * useMemoコンポーネントのビジネスロジック
 * @returns 
 */
function useMemo(props: propsType) {

    //詳細画面へのルーティング用ID
    const [detailRoutingId, setDetailRoutingId] = useAtom(detailRoutingIdAtom);
    //ルーティング用
    const navigate = useNavigate();
    //検索条件リスト
    const { data: memoSearchConditionList } = useQueryWrapper<memoSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT},${SEARCHCONDITION_KEY_CUSTOM}`,
    });

    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultMemoUrlCondition(memoSearchConditionList);

    //初期表示メモ取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        createDefaultUrlCondition();
    }, [memoSearchConditionList]);

    //詳細画面のURLを直打ちした際にルーディングを作成
    useEffect(() => {
        let pathArray = window.location.pathname.split("/");
        if (pathArray.length !== 3) {
            return;
        }
        //ID部分を取得
        let memoId = pathArray[2];
        //IDチェック
        if (isNaN(Number(memoId.replace(PRE_MEMO_ID, "")))) {
            //ダミーをセット
            memoId = DUMMY_ID;
        }
        setDetailRoutingId(memoId);
    }, []);

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const backPageFunc = () => {
        navigate(props.path);
    }

    return {
        detailRoutingId,
        backPageFunc,
    };
}

export default useMemo;