import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { apiTaskDetailType, customAttributeListType, displayTaskType, inputTaskSettingType, taskListType, viewTaskType } from "../Type/TaskType";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createCunstomAttributeViewList } from "../Function/TaskFunction";


//引数の型
type propsType = {
    taskSettingList: inputTaskSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updTask: apiTaskDetailType | undefined,
    openEditPage: () => void,
    closeFn?: () => void,
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
        let tmpViewTaskList: viewTaskType[] = [];
        let tmpViewCustomAttributeList: viewTaskType[] = [];

        if (!props.taskSettingList) {
            return;
        }
        if (!props.updTask) {
            return;
        }
        if (!props.generalDataList) {
            return;
        }
        props.taskSettingList.forEach((element) => {
            let tmpValue: string = "";

            //項目の表示非表示
            if (element.isHidden) {
                return;
            }
            //カスタム属性をセット
            if (element.id === "customAttribute") {
                if (!props.updTask?.customAttribute) {
                    return;
                }
                tmpViewCustomAttributeList = createCunstomAttributeViewList(props.updTask.customAttribute);
                return;
            }

            for (const [columnKey, value] of Object.entries(props.updTask?.default as {})) {
                //キーの一致する要素を取り出す
                if (element.id === columnKey) {
                    tmpValue = value as string;
                    break;
                }
            }

            let tmpSelectLits: comboType[] = [];
            //リストキーが存在する(選択項目)
            if (element.listKey && props.generalDataList) {
                //汎用詳細から対応するリストを抽出
                tmpSelectLits = props.generalDataList.filter((item) => {
                    return item.id === element.listKey;
                });
                //valueに一致する要素を抽出
                let matchList = tmpSelectLits.filter((item) => {
                    return item.value === tmpValue;
                });
                //labelを「/」区切りで結合
                tmpValue = matchList.map((item) => {
                    return item.label;
                }).join("/");
            }
            tmpViewTaskList.push({
                title: element.name,
                value: tmpValue,
            });
        });
        setViewTask({
            default: tmpViewTaskList,
            customAttribute: tmpViewCustomAttributeList,
        });
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
            title: `戻る`,
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