import { ReactNode, RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { comboType, masterDataListType, refConditionType, refInfoType, } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { taskSearchConditionRefType, taskSearchConditionType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useSwitch from "../../Common/Hook/useSwitch";
import useGetGeneralDataList from "../../Common/Hook/useGetGeneralDataList";
import SpaceComponent from "../../Common/SpaceComponent";
import React from "react";
import { createQuery, getUrlQuery, parseStrDate } from "../../Common/Function/Function";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";
import { createSearchDispCondition, createSearchRefArray } from "../Function/TaskFunction";
import { taskListUrlAtom, taskSearchConditionObjAtom } from "../Atom/TaskAtom";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY, TASK_SEARCH_URL } from "../Const/TaskConst";


//引数の型
type propsType = {
    taskSearchConditionList: taskSearchConditionType[] | undefined
}


/**
 * TaskSearchコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskSearch(props: propsType) {

    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //検索条件参照用リスト
    const [taskSearchRefInfo, setTaskSearchRefInfo] = useState<taskSearchConditionRefType>({
        default: [],
        custom: []
    });
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useAtom(taskSearchConditionObjAtom);
    //ルーティング用
    const navigate = useNavigate();

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition();

    //現在の検索条件(画面表示用)
    const displaySearchConditionList = useMemo(() => {
        if (!props.taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件のdomを作成
        return createSearchDispCondition(props.taskSearchConditionList, searchConditionObj);
    }, [searchConditionObj, props.taskSearchConditionList]);


    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        //モーダル内の検索条件を取得
        let query = getUrlQuery(searchConditionObj);

        //URLを更新
        setTaskListUrl(`${TASK_SEARCH_URL}${createQuery(query)}`);
        navigate(`${createQuery(query)}`);
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        if (!props.taskSearchConditionList) {
            return;
        }

        createDefaultUrlCondition({ taskSearchConditionList: props.taskSearchConditionList });
    }

    /**
     * モーダルオープンイベント
     */
    function openModal() {
        if (!props.taskSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件の参照を作成
        setTaskSearchRefInfo(createSearchRefArray(props.taskSearchConditionList, searchConditionObj));
        onFlag();
    }

    /**
     * モーダルクローズイベント
     */
    function closeModalSetCondition() {
        if (!taskSearchRefInfo) {
            offFlag();
        }
        //検索条件を保存する
        let tmpCondition: { [key: string]: string } = {};
        Object.keys(taskSearchRefInfo).forEach((objKey) => {
            taskSearchRefInfo[objKey].forEach((element) => {
                if (!element.ref.current) {
                    return true;
                }
                tmpCondition[element.id] = element.ref.current.refValue;
            });
        });
        setSearchConditionObj(tmpCondition);
        offFlag();
    }

    /**
     * 検索条件モーダルを閉じる
     */
    function closeModal() {
        offFlag();
    }

    return {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModalSetCondition,
        taskSearchRefInfo,
        displaySearchConditionList,
        closeModal,
    };
}

export default useTaskSearch;