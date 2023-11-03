import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { customAttributeListType, inputTaskSettingType, taskListType, viewTaskType } from "../Type/TaskType";
import { buttonObjType } from "../../Master/MasterEditFooter";


//引数の型
type propsType = {
    taskSettingList: inputTaskSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updTask: taskListType | undefined,
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
    const [viewTask, setViewTask] = useState<viewTaskType[]>([]);

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
            //カスタム属性
            if (element.id === "customAttribute") {
                if (!props.updTask?.customAttribute) {
                    return;
                }
                let tmpValue = props.updTask.customAttribute as customAttributeListType[];
                tmpValue.forEach((element) => {
                    let tmp = element.value;
                    let list = element.list;

                    //選択形式の場合は名称を取得する
                    if (list && list.length > 0) {
                        let selected = list.find((element) => element.value === tmp);
                        //選択値に該当するデータがない場合
                        if (!selected) {
                            return;
                        }
                        tmp = selected.label;
                    }

                    tmpViewCustomAttributeList.push({
                        title: element.name,
                        value: tmp,
                    });
                });
                return;
            }

            for (const [columnKey, value] of Object.entries(props.updTask as {})) {
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
        setViewTask(tmpViewTaskList);
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