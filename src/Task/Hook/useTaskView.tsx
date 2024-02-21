import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { apiTaskDetailType, customAttributeListType, displayTaskType, inputTaskSettingType, taskListType, viewTaskType } from "../Type/TaskType";
import { createTaskViewList } from "../Function/TaskFunction";


//引数の型
type propsType = {
    taskSettingList: inputTaskSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updTask: apiTaskDetailType | undefined,
    openEditPage: () => void,
    closeFn?: () => void,
    backBtnTitle?: string,
}


/**
 * useTaskViewコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskView(props: propsType) {

    //閲覧用タスク
    const [viewTask, setViewTask] = useState<displayTaskType>();

    //入力欄参照用refの作成
    useEffect(() => {
        if (!props.taskSettingList) {
            return;
        }
        if (!props.updTask) {
            return;
        }
        if (!props.generalDataList) {
            return;
        }

        //タスクの詳細リストを作成
        setViewTask(createTaskViewList(props.taskSettingList, props.updTask, props.generalDataList));
    }, [props.taskSettingList, props.updTask, props.generalDataList]);


    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.closeFn) {
            props.closeFn();
        }
    }

    return {
        viewTask,
        backPageButtonObj: {
            title: props.backBtnTitle ?? `戻る`,
            type: `BASE`,
            onclick: props.closeFn ? backPageButtonFunc : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `編集`,
            type: `RUN`,
            onclick: props.openEditPage
        } as buttonObjType,
    }
}

export default useTaskView;