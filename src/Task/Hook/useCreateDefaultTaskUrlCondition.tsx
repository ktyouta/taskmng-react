import ENV from '../../env.json';
import { useSetAtom } from "jotai";
import { taskSearchConditionType } from '../Type/TaskType';
import { taskListUrlAtom, taskSearchConditionObjAtom } from '../Atom/TaskAtom';
import { useNavigate } from "react-router-dom";


//引数の型
type propsType = {
    taskSearchConditionList: taskSearchConditionType[],
    querySkipFlg?: boolean
}


/**
 * 検索条件設定リストから初期表示タスクの取得用URLを作成するメソッドを返却
 * @param taskSearchConditionList タスクの設定リスト
 * @returns 
 */
function useCreateDefaultTaskUrlCondition() {

    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);
    //検索条件用オブジェクト
    const setSearchConditionObj = useSetAtom(taskSearchConditionObjAtom);
    //ルーティング用
    const navigate = useNavigate();


    /**
     * 初期表示タスク取得用URLと検索条件オブジェクトの作成
     */
    const createDefaultUrlCondition = (props: propsType) => {

        //クエリパラメータが存在する場合はスキップ
        if (window.location.search && props.querySkipFlg) {
            return;
        }

        let tmpCondition: { [key: string]: string } = {};
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";

        props.taskSearchConditionList.forEach((element) => {
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

        //詳細画面のURLが直打ちされた場合はURLを変えない
        if (window.location.pathname.split("/").length < 3) {
            navigate(query);
        }
    }

    return {
        createDefaultUrlCondition,
    }
}

export default useCreateDefaultTaskUrlCondition;