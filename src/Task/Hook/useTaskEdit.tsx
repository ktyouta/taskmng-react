import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { apiTaskDetailType, editDisplayTaskType, inputTaskSettingType, taskListType, viewTaskType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import { createCunstomAttributeEditList, createCunstomAttributeViewList, createUpdRefArray } from "../Function/TaskFunction";


//引数の型
type propsType = {
    updTaskId: string,
    backFn?: () => void,
    closeFn?: () => void,
    taskSettingList: inputTaskSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updTask: apiTaskDetailType | undefined,
}


/**
 * useTaskEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskEdit(props: propsType) {

    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<editDisplayTaskType>();
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");

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

        setRefInfoArray(createUpdRefArray(props.taskSettingList, props.updTask, props.generalDataList));
    }, [props.taskSettingList, props.updTask, props.generalDataList]);

    //更新用フック
    const updMutation = useMutationWrapper({
        url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${props.updTaskId}` : ``,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            if (props.closeFn) props.closeFn();
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setErrMessage(res.response.data.errMessage);
        },
    });

    //削除用フック
    const delMutation = useMutationWrapper({
        url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${props.updTaskId}` : ``,
        method: "DELETE",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            if (props.closeFn) props.closeFn();
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setErrMessage(res.response.data.errMessage);
        },
    });

    /**
     * 戻るボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.backFn) {
            props.backFn();
        }
    }

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        if (!refInfoArray || !refInfoArray.default || !refInfoArray.customAttribute) {
            return;
        }
        refInfoArray.default.forEach((element) => {
            element.ref.current?.clearValue();
        });
        refInfoArray.customAttribute.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    /**
     * 更新ボタン押下処理
     */
    const update = () => {
        if (!refInfoArray || !refInfoArray.default || !refInfoArray.customAttribute || refInfoArray.default.length === 0) {
            return;
        }
        //入力チェック
        // let inputCheckObj = requestBodyInputCheck(refInfoArray);
        // //入力エラー
        // if (inputCheckObj.errFlg) {
        //     setRefInfoArray(inputCheckObj.refInfoArray);
        //     return;
        // }
        // if (!window.confirm('タスクを更新しますか？')) {
        //     return
        // }
        // if (!updMutation) {
        //     alert("リクエストの送信に失敗しました。");
        //     return;
        // }
        // let body: bodyObj = createRequestBody(refInfoArray);
        // //bodyの作成
        // updMutation.mutate(body);
    }

    /**
     * 削除ボタン押下処理
     */
    const deleteTask = () => {
        // if (!refInfoArray || refInfoArray.length === 0) {
        //     return;
        // }
        // if (!window.confirm('タスクを削除しますか？')) {
        //     return
        // }
        // if (!updMutation) {
        //     alert("リクエストの送信に失敗しました。");
        //     return;
        // }
        // delMutation.mutate();
    }

    return {
        refInfoArray,
        //isLoading: isLoadinGetUpdTask,
        isUpDelLoading: updMutation.isLoading || delMutation.isLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        negativeButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: refInfoArray && refInfoArray.default.length > 0 ? clearButtonFunc : undefined
        } as buttonObjType,
        deleteButtonObj: {
            title: `削除`,
            type: `DANGER`,
            onclick: refInfoArray && refInfoArray.default.length > 0 ? deleteTask : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `更新`,
            type: `RUN`,
            onclick: refInfoArray && refInfoArray.default.length > 0 ? update : undefined
        } as buttonObjType,
        errMessage,
    }
}

export default useTaskEdit;