import { memo, useEffect, useState } from "react";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultMemoUrlCondition from "./useCreateDefaultMemoUrlCondition";
import { useNavigate } from "react-router-dom";
import { memoSearchConditionType } from "../Type/MemoType";
import { detailRoutingIdAtom, memoListQueryParamAtom, memoSearchConditionObjAtom, selectedTagListAtom } from "../Atom/MemoAtom";
import { DUMMY_ID, PRE_MEMO_ID, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../Const/MemoConst";
import { getUrlQueryObj } from "../Function/MemoFunction";


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
    //検索条件用オブジェクト
    const setSearchConditionObj = useSetAtom(memoSearchConditionObjAtom);
    //選択中のタグリスト
    const setSelectedTagList = useSetAtom(selectedTagListAtom);
    //一覧画面のルーティング用
    const [memoListQueryParam, setMemoListQueryParam] = useAtom(memoListQueryParamAtom);

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
        if (pathArray.length < 2) {
            return;
        }

        let query = "";
        let memoId = "";

        //メモ一覧
        if (pathArray.length == 2) {
            let query = window.location.search;
            if (query.includes("?")) {
                //検索条件オブジェクトにデータをセット
                setSearchConditionObj(getUrlQueryObj(query));
            }
        }
        //メモ詳細
        else if (pathArray.length == 3) {
            //ID部分を取得
            memoId = pathArray[2];
            //IDチェック
            if (isNaN(Number(memoId.replace(PRE_MEMO_ID, "")))) {
                memoId = DUMMY_ID;
            }
        }

        setDetailRoutingId(memoId);
        setMemoListQueryParam(query);
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
        memoListQueryParam,
    };
}

export default useMemo;