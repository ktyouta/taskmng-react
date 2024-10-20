import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { customAttributeRequestBodyType, editDisplayTaskType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import { checkTaskRequest, createCunstomAttributeEditList, createCunstomAttributeRegistList, createRegistRefArray, createTaskCustomAttributeRequestBody, createTaskRequestBody } from "../Function/TaskFunction";


//引数の型
type propsType = {
    closeFn?: () => void,
}


/**
 * useTaskEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskRegister(props: propsType) {

    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<editDisplayTaskType>();
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState<string>();

    //入力欄設定リスト
    const { taskSettingList } = useGetTaskInputSetting();

    //汎用詳細リスト
    const { data: generalDataList, isLoading } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //カスタム属性入力設定リスト
    const { data: customAttributeInputSetting } = useQueryWrapper<refInfoType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTEINPUTSETTING}`,
    });

    //入力欄参照用refの作成
    useEffect(() => {
        if (!taskSettingList) {
            return;
        }
        if (!generalDataList) {
            return;
        }
        if (!customAttributeInputSetting) {
            return;
        }

        //入力欄の参照を作成
        setRefInfoArray(createRegistRefArray(taskSettingList, generalDataList, customAttributeInputSetting));
    }, [taskSettingList, generalDataList, customAttributeInputSetting]);

    //登録用フック
    const registerMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`,
        method: "POST",
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
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.closeFn) {
            props.closeFn();
        }
    }

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力をクリアしますか？")) {
            return;
        }
        if (!refInfoArray) {
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
     * 登録ボタン押下処理
     */
    const create = () => {
        if (!refInfoArray || !refInfoArray.default || refInfoArray.default.length === 0 || !refInfoArray.customAttribute) {
            return;
        }

        //入力チェック
        let errObj = checkTaskRequest(refInfoArray);
        if (errObj.errFlg) {
            setRefInfoArray(errObj.refInfoArray);
            return;
        }

        if (!window.confirm('タスクを登録しますか？')) {
            return
        }
        if (!registerMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        //bodyの作成
        registerMutation.mutate(createTaskRequestBody(refInfoArray));
    }

    return {
        refInfoArray,
        isUpDelLoading: registerMutation.isLoading,
        backPageButtonObj: {
            title: `閉じる`,
            type: `GRAD_GRAY`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        negativeButtonObj: {
            title: `元に戻す`,
            type: `GRAD_BLUE`,
            onclick: refInfoArray && refInfoArray.default && refInfoArray.customAttribute ? clearButtonFunc : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `登録`,
            type: `GRAD_BLUE`,
            onclick: refInfoArray && refInfoArray.default && refInfoArray.customAttribute ? create : undefined
        } as buttonObjType,
        errMessage,
    }
}

export default useTaskRegister;