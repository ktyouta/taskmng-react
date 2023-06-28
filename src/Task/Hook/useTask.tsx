import { useEffect, useState } from "react";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { searchConditionType, taskSearchConditionType } from "../../Common/Type/CommonType";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";


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

/**
 * useTaskコンポーネントのビジネスロジック
 * @returns 
 */
function useTask() {

    //詳細画面へのルーティング用ID
    const [detailRoutingId, setDetailRoutingId] = useAtom(detailRoutingIdAtom);

    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
        callback: createSearchConditionList
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

    return {
        detailRoutingId,
    };
}

export default useTask;