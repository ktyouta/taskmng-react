import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, inputMasterSettingType, inputSettingType, inputTaskSettingType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWapper";
import { generalDataType, taskListType } from "../Type/TaskType";
import { PRIORITY_URL } from "../Task";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";


//引数の型
type propsType = {
    updTask: taskListType | undefined
}


/**
 * 入力欄設定リストを作成
 * @param data 
 * @returns 
 */
function createInputSettingList(data: inputSettingType): inputTaskSettingType[] {
    return data.taskEditSetting;
}


/**
 * useTaskEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskEdit(props: propsType) {

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [updErrMessage, setUpdErrMessage] = useState(``);
    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<refInfoType[]>([]);

    //入力欄設定リスト
    const { data: taskSettingList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.INPUTSETTING}`,
        callback: createInputSettingList
    });

    //入力欄参照用refの作成
    useEffect(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!taskSettingList ||
            taskSettingList.length === 0
        ) {
            return;
        }
        if (!props.updTask) {
            return;
        }
        taskSettingList.forEach((element) => {
            let tmpValue: string | undefined = undefined;
            for (const [columnKey, value] of Object.entries(props.updTask as {})) {
                //キーの一致する要素を取り出す
                if (element.id === columnKey) {
                    tmpValue = value as string;
                    break;
                }
            }
            let isVisible = true;
            //項目の表示非表示
            if (element.isHidden) {
                isVisible = false;
            }
            tmpRefInfoArray.push({
                id: element.id,
                name: element.name,
                type: element.type,
                lenght: element.length,
                //キーに一致するデータが存在する場合はその値を表示
                value: tmpValue ?? element.value,
                //閲覧モードの場合は全項目編集不可
                editFlg: element.isEditable,
                visible: isVisible,
                ref: createRef(),
            });
        });
        setRefInfoArray(tmpRefInfoArray);
    }, [taskSettingList, props.updTask]);

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setUpdErrMessage(res.response.data.errMessage);
        },
    });

    //削除用フック
    const delMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
        method: "DELETE",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setUpdErrMessage(res.response.data.errMessage);
        },
    });

    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
    }

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
    }

    /**
     * 更新ボタン押下処理
     */
    const update = () => {
        if (!window.confirm('タスクを更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        let body: bodyObj = {};
        //bodyの作成
        updMutation.mutate(body);
    }

    return {
        refInfoArray,
        isLoading: updMutation.isLoading || delMutation.isLoading,
        updErrMessage,
        backPageButtonObj: { title: `閉じる`, type: `BASE`, onclick: backPageButtonFunc } as buttonObjType,
        negativeButtonObj: { title: `元に戻す`, type: `RUN`, onclick: clearButtonFunc } as buttonObjType,
        positiveButtonObj: { title: `更新`, type: `RUN`, onclick: update } as buttonObjType,
    }
}

export default useTaskEdit;