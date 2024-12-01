import { SetStateAction, useEffect, useState } from "react";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useCreateDefaultTaskUrlCondition from "./useCreateDefaultTaskUrlCondition";
import { useLocation, useNavigate } from "react-router-dom";
import { taskSearchConditionType } from "../Type/TaskType";
import { detailRoutingIdAtom, taskAuthorityAtom, taskListUrlAtom, taskSearchConditionObjAtom } from "../Atom/TaskAtom";
import { DUMMY_ID, PRE_TASK_ID, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY, TASK_SEARCH_URL } from "../Const/TaskConst";
import { getUrlQueryObj } from "../Function/TaskFunction";
import { createQuery, getUrlQuery } from "../../Common/Function/Function";
import { authType } from "../../Common/Hook/useCheckAuth";
import useSetUserMenuAuth from "../../Common/Hook/useSetUserMenuAuth";


//引数の型
type propsType = {
    path: string,
    menuId: string,
    authList: authType[]
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
    //メモリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useAtom(taskSearchConditionObjAtom);
    //ロケーションオブジェクト
    const location = useLocation();
    //タスク画面の権限
    const setTaskAuthority = useSetAtom(taskAuthorityAtom);

    //タスク画面の権限をセットする
    useSetUserMenuAuth({
        setter: setTaskAuthority,
        authList: props.authList,
        menuId: props.menuId
    });

    //検索条件リスト
    const { data: taskSearchConditionList } = useQueryWrapper<taskSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT},${SEARCHCONDITION_KEY_CUSTOM}`,
        options: {
            staleTime: 0,
            cacheTime: 0,
        }
    });

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultTaskUrlCondition();

    //初期表示タスク取得用URLと検索条件オブジェクトの作成
    useEffect(() => {
        if (!taskSearchConditionList) {
            return;
        }

        createDefaultUrlCondition({ taskSearchConditionList, querySkipFlg: true });
    }, [taskSearchConditionList]);


    //詳細画面のURLを直打ちした際にルーディングを作成
    useEffect(() => {
        let pathArray = window.location.pathname.split("/");
        if (pathArray.length < 2) {
            return;
        }

        let query = "";
        let taskId = "";

        //タスク一覧
        if (pathArray.length == 2) {
            if (window.location.search.includes("?")) {
                query = window.location.search;
                //検索条件オブジェクトにデータをセット
                setSearchConditionObj(getUrlQueryObj(query));
                setTaskListUrl(`${TASK_SEARCH_URL}${query}`);
            }
        }
        //タスク詳細
        else if (pathArray.length == 3) {
            //ID部分を取得
            taskId = pathArray[2];
            //IDチェック
            if (isNaN(Number(taskId.replace(PRE_TASK_ID, "")))) {
                taskId = DUMMY_ID;
            }
        }

        setDetailRoutingId(taskId);
    }, [location]);

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const backPageFunc = () => {
        navigate(`${props.path}${createQuery(getUrlQuery(searchConditionObj))}`);
    }

    return {
        detailRoutingId,
        backPageFunc,
        taskSearchConditionList,
    };
}

export default useTask;