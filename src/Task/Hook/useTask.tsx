import { useEffect, useState } from "react";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";
import { useNavigate } from "react-router-dom";
import { searchConditionType, taskSearchConditionType } from "../Type/TaskType";


type propsType = {
    path: string
}

/**
 * タスクの検索条件リストを取得
 * @param data 
 * @returns 
 */
function createSearchConditionList(data: searchConditionType): taskSearchConditionType[] {
    return data.task;
}

//検索条件用オブジェクト
export const taskSearchConditionObjAtom = atom<{ [key: string]: string }>({});
//詳細画面へのルーティング用ID
export const detailRoutingIdAtom = atom("");
//タスクIDの接頭辞
const PRE_TASK_ID = `TASKID-`;
//検索条件取得用のクエリキー
export const SEARCHCONDITION_QUERY_KEY = "?attribute=";
//デフォルト属性用の検索条件取得キー
export const SEARCHCONDITION_KEY_DEFAULT = "default";
//カスタム属性用の検索条件取得キー
export const SEARCHCONDITION_KEY_CUSTOM = "custom";


/**
 * useTaskコンポーネントのビジネスロジック
 * @returns 
 */
function useTask(props: propsType) {

    //詳細画面へのルーティング用ID
    const [detailRoutingId, setDetailRoutingId] = useAtom(detailRoutingIdAtom);
    //ルーティング用
    const navigate = useNavigate();
    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper<taskSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT},${SEARCHCONDITION_KEY_CUSTOM}`,
    });

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition(taskSearchConditionList);

    //初期表示タスク取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        createDefaultUrlCondition();
    }, [taskSearchConditionList]);

    //詳細画面のURLを直打ちした際にルーディングを作成
    useEffect(() => {
        let pathArray = window.location.pathname.split("/");
        if (pathArray.length !== 3) {
            return;
        }
        //ID部分を取得
        let taskId = pathArray[2];
        //IDチェック
        if (isNaN(Number(taskId.replace(PRE_TASK_ID, "")))) {
            //ダミーをセット
            taskId = "ZZZ";
        }
        setDetailRoutingId(taskId);
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

export default useTask;