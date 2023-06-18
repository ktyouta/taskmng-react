import { useEffect, useState } from "react";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { taskListType } from "../Type/TaskType";
import { taskListUrlAtom } from "./useTaskListContent";
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


/**
 * useTaskコンポーネントのビジネスロジック
 * @returns 
 */
function useTask() {

    //データの取得に失敗した場合のメッセージ
    const [errMessage, setErrMessage] = useState(``);

    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
        callback: createSearchConditionList
    });

    //ルーティング用のタスクリストを取得(ログインユーザーが取得できる全てのタスク)
    const { data: taskList } = useQueryWrapper<taskListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
            afSuccessFn: (data) => {
                let errMessage = "";
                //データが存在しない
                if (!data || data.length === 0) {
                    errMessage = "データが存在しません。";
                }
                setErrMessage(errMessage);
            }
        }
    );

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition(taskSearchConditionList);

    //初期表示タスク取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        createDefaultUrlCondition();
    }, [taskSearchConditionList]);

    return {
        taskList,
        errMessage,
    };
}

export default useTask;