import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../../env.json';
import { createTabItems } from "../../../Task/Function/TaskFunction";
import { taskSearchConditionRefType, taskSearchConditionType } from "../../../Task/Type/TaskType";
import { buttonObjType } from "../../../Common/Type/CommonType";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../../../Task/Const/TaskConst";
import useCreateDefaultTaskUrlCondition from "../../../Task/Hook/useCreateDefaultTaskUrlCondition";



/**
 * useTaskConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useSettingSearchConditionTop() {

    /**
     * 更新ボタン押下処理
     */
    const updButtonFunc = () => {

    }

    //検索条件の設定リスト
    const { data: taskSearchConditionList } = useQueryWrapper<taskSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT},${SEARCHCONDITION_KEY_CUSTOM}`,
    });

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition(taskSearchConditionList);

    //現在の検索条件(画面表示用)
    // const displaySearchConditionList = useMemo(() => {
    //     if (!taskSearchConditionList) {
    //         return;
    //     }
    //     if (!searchConditionObj) {
    //         return;
    //     }

    //     //検索条件のdomを作成
    //     return createSearchDispCondition(taskSearchConditionList, searchConditionObj);
    // }, [searchConditionObj, taskSearchConditionList]);

    //タスクの検索条件画面
    // let searchConditionComponent = useMemo(() => {
    //     if (!props.taskSearchRefInfo) {
    //         return;
    //     }

    //     return createTabItems(props.taskSearchRefInfo);
    // }, [props.taskSearchRefInfo]);

    return {
        backPageButtonObj: {
            title: `検索条件初期値を更新する`,
            type: `BASE`,
            onclick: updButtonFunc
        } as buttonObjType,
        //searchConditionComponent,
    }
}

export default useSettingSearchConditionTop;