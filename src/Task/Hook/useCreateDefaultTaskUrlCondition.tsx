import ENV from '../../env.json';
import { taskSearchConditionType } from "../../Common/Type/CommonType";
import { useSetAtom } from "jotai";
import { taskListUrlAtom } from "./useTaskListContent";
import { taskSearchConditionObjAtom } from "./useTask";


/**
 * 
 * @param selectedMaster 
 * @returns 
 */
function useCreateDefaultTaskUrlCondition(taskSearchConditionList: taskSearchConditionType[] | undefined) {

    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //検索条件用オブジェクト
    const setSearchConditionObj = useSetAtom(taskSearchConditionObjAtom);

    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const createDefaultUrlCondition = () => {
        if (!taskSearchConditionList) {
            return;
        }
        let tmpCondition: { [key: string]: string } = {};
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";
        taskSearchConditionList.forEach((element) => {
            //値が存在するプロパティをクエリストリングに設定
            if (!element.value) {
                return;
            }
            if (query !== "?") {
                query += "&";
            }
            query += `${element.id}=${element.value}`;
            tmpCondition[element.id] = element.value;
        });
        if (query.length > 1) {
            tmpUrl += query;
        }
        //初期表示タスク取得用URLの作成
        setTaskListUrl(tmpUrl);
        //検索条件オブジェクトの作成
        setSearchConditionObj(tmpCondition);
    }

    return {
        createDefaultUrlCondition,
    }
}

export default useCreateDefaultTaskUrlCondition;