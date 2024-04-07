import { ReactNode, RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { comboType, masterDataListType, refConditionType, refInfoType, } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { memoSearchConditionRefType, memoSearchConditionType } from "../Type/MemoType";
import { refType } from "../../Common/BaseInputComponent";
import useSwitch from "../../Common/Hook/useSwitch";
import useGetGeneralDataList from "../../Common/Hook/useGetGeneralDataList";
import SpaceComponent from "../../Common/SpaceComponent";
import React from "react";
import { parseStrDate } from "../../Common/Function/Function";
import useCreateDefaultMemoUrlCondition from "./useCreateDefaultMemoUrlCondition";
import { createSearchDispCondition, createSearchRefArray } from "../Function/MemoFunction";
import { memoListUrlAtom, memoSearchConditionObjAtom } from "../Atom/MemoAtom";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../Const/MemoConst";



/**
 * MemoSearchコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoSearch() {

    //メモリスト取得用URL
    const setMemoListUrl = useSetAtom(memoListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //検索条件参照用リスト
    const [memoSearchRefInfo, setMemoSearchRefInfo] = useState<refInfoType[]>([]);
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useAtom(memoSearchConditionObjAtom);

    //検索条件の設定リスト
    const { data: memoSearchConditionList } = useQueryWrapper<memoSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOSEARCHCONDITION}`,
    });

    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultMemoUrlCondition(memoSearchConditionList);

    //現在の検索条件(画面表示用)
    const displaySearchConditionList = useMemo(() => {
        if (!memoSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件のdomを作成
        return createSearchDispCondition(memoSearchConditionList, searchConditionObj);
    }, [searchConditionObj, memoSearchConditionList]);


    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}`;
        let query = "?";

        //モーダル内の検索条件を取得
        Object.keys(searchConditionObj).forEach((element) => {
            //値が存在するプロパティをクエリストリングに設定
            if (!searchConditionObj[element]) {
                return;
            }
            if (query !== "?") {
                query += "&";
            }
            query += `${element}=${searchConditionObj[element]}`;
        });
        if (query.length > 1) {
            tmpUrl += query;
        }
        //URLを更新
        setMemoListUrl(tmpUrl);
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        createDefaultUrlCondition();
    }

    /**
     * モーダルオープンイベント
     */
    function openModal() {
        if (!memoSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件の参照を作成
        setMemoSearchRefInfo(createSearchRefArray(memoSearchConditionList, searchConditionObj));
        onFlag();
    }

    /**
     * モーダルクローズイベント
     */
    function closeModal() {
        if (!memoSearchRefInfo) {
            offFlag();
        }
        //検索条件を保存する
        let tmpCondition: { [key: string]: string } = {};
        memoSearchRefInfo.forEach((element) => {
            if (!element.ref.current) {
                return true;
            }
            tmpCondition[element.id] = element.ref.current.refValue;
        });
        setSearchConditionObj(tmpCondition);
        offFlag();
    }

    return {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        memoSearchRefInfo,
        displaySearchConditionList,
    };
}

export default useMemoSearch;