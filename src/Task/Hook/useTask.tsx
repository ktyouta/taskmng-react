import { useEffect, useState } from "react";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";
import { useNavigate } from "react-router-dom";
import { taskSearchConditionType } from "../Type/TaskType";
import { detailRoutingIdAtom } from "../Atom/TaskAtom";
import { DUMMY_ID, PRE_TASK_ID, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../Const/TaskConst";


//引数の型
type propsType = {
    path: string
}


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
            taskId = DUMMY_ID;
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