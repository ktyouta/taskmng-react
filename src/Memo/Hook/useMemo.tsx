import { memo, useEffect, useState } from "react";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultMemoUrlCondition from "./useCreateDefaultMemoUrlCondition";
import { useNavigate } from "react-router-dom";
import { memoSearchConditionType } from "../Type/MemoType";
import { detailRoutingIdAtom, memoListUrlAtom, memoSearchConditionObjAtom, selectedTagListAtom } from "../Atom/MemoAtom";
import { DUMMY_ID, MEMO_SEARCHCONDITION_URL, MEMO_SEARCH_URL, PRE_MEMO_ID, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../Const/MemoConst";
import { getUrlQueryMemo, getUrlQueryObj, getUrlQueryTagList } from "../Function/MemoFunction";
import { createQuery, getUrlQuery } from "../../Common/Function/Function";


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
    const [searchConditionObj, setSearchConditionObj] = useAtom(memoSearchConditionObjAtom);
    //選択中のタグリスト
    const [selectedTagList, setSelectedTagList] = useAtom(selectedTagListAtom);
    //メモリスト取得用URL
    const setMemoListUrl = useSetAtom(memoListUrlAtom);

    //検索条件リスト
    const { data: memoSearchConditionList } = useQueryWrapper<memoSearchConditionType[]>({
        url: MEMO_SEARCHCONDITION_URL,
    });

    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultMemoUrlCondition();

    //初期表示メモ取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        if (!memoSearchConditionList) {
            return;
        }
        createDefaultUrlCondition({ memoSearchConditionList, querySkipFlg: true });
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
            if (window.location.search.includes("?")) {
                query = window.location.search;
                //検索条件オブジェクトにデータをセット
                setSearchConditionObj(getUrlQueryObj(query));
                setSelectedTagList(getUrlQueryTagList(query));
                setMemoListUrl(`${MEMO_SEARCH_URL}${query}`);
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
    }, []);

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const backPageFunc = () => {
        navigate(`${props.path}${createQuery(getUrlQueryMemo(searchConditionObj, selectedTagList))}`);
    }

    return {
        detailRoutingId,
        backPageFunc,
    };
}

export default useMemo;