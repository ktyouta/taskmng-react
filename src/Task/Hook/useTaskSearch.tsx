import { ReactNode, RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { comboType, masterDataListType, refConditionType, refInfoType, } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { searchConditionType, taskListType, taskSearchConditionType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import { taskListUrlAtom } from "./useTaskListContent";
import useSwitch from "../../Common/Hook/useSwitch";
import useGetGeneralDataList from "../../Common/Hook/useGetGeneralDataList";
import SpaceComponent from "../../Common/SpaceComponent";
import React from "react";
import { parseStrDate } from "../../Common/Function/Function";
import { SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY, taskSearchConditionObjAtom } from "./useTask";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";
import { createSearchDispCondition, createSearchRefArray } from "../Function/TaskFunction";



/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskSearch() {

    //登録するタスク内容
    const contentRef: RefObject<refType> = useRef(null);
    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //検索条件参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<refInfoType[]>([]);
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useAtom(taskSearchConditionObjAtom);

    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper<taskSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT}`,
    });
    //汎用詳細リスト
    const { generalDataList } = useGetGeneralDataList();

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition(taskSearchConditionList);

    //現在の検索条件(画面表示用)
    const displaySearchConditionList = useMemo(() => {
        if (!taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }
        if (!generalDataList) {
            return;
        }

        //検索条件のdomを作成
        return createSearchDispCondition(taskSearchConditionList, searchConditionObj, generalDataList);
    }, [searchConditionObj, taskSearchConditionList, generalDataList]);


    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";
        if (contentRef.current && contentRef.current?.refValue) {
            query += `keyword=${contentRef.current?.refValue}`;
        }
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
        setTaskListUrl(tmpUrl);
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
        if (!taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }
        if (!generalDataList) {
            return;
        }

        //検索条件の参照を作成
        setRefInfoArray(createSearchRefArray(taskSearchConditionList, searchConditionObj, generalDataList,));
        onFlag();
    }

    /**
     * モーダルクローズイベント
     */
    function closeModal() {
        if (!refInfoArray) {
            offFlag();
        }
        //検索条件を保存する
        let tmpCondition: { [key: string]: string } = {};
        refInfoArray.forEach((element) => {
            if (!element.ref.current) {
                return true;
            }
            tmpCondition[element.id] = element.ref.current.refValue;
        });
        setSearchConditionObj(tmpCondition);
        offFlag();
    }

    return {
        contentRef,
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        refInfoArray,
        displaySearchConditionList,
    };
}

export default useTaskSearch;