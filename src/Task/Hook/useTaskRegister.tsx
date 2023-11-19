import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { editDisplayTaskType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import { createCunstomAttributeEditList, createCunstomAttributeRegistList } from "../Function/TaskFunction";


//引数の型
type propsType = {
    closeFn?: () => void,
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
        let tmpRefInfoArray: refInfoType[] = [];
        let tmpEditCustomAttributeList: refInfoType[] = [];

        if (!taskSettingList) {
            return;
        }
        if (!generalDataList) {
            return;
        }
        if (!customAttributeInputSetting) {
            return;
        }

        taskSettingList.forEach((element) => {
            let isVisible = true;
            let tmpSelectLits: comboType[] = [];

            //カスタム属性をセット
            if (element.id === "customAttribute") {
                tmpEditCustomAttributeList = createCunstomAttributeRegistList(customAttributeInputSetting);
                return;
            }

            //項目の表示非表示
            if (element.isHidden || !element.isNewCreateVisible) {
                isVisible = false;
            }
            //リストキーが存在する(選択項目)
            if (element.listKey) {
                tmpSelectLits = generalDataList.filter((item) => {
                    return item.id === element.listKey;
                });
            }
            tmpRefInfoArray.push({
                id: element.id,
                name: element.name,
                type: element.type,
                length: element.length,
                //キーに一致するデータが存在する場合はその値を表示
                value: element.value,
                disabled: element.disabled,
                visible: isVisible,
                selectList: tmpSelectLits,
                description: element.description,
                isRequired: element.isRequired,
                ref: createRef(),
            });
        });
        setRefInfoArray({
            default: tmpRefInfoArray,
            customAttribute: tmpEditCustomAttributeList,
        });
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
        // if (!refInfoArray || refInfoArray.length === 0) {
        //     return;
        // }
        // //入力チェック
        // let inputCheckObj = requestBodyInputCheck(refInfoArray);
        // //入力エラー
        // if (inputCheckObj.errFlg) {
        //     setRefInfoArray(inputCheckObj.refInfoArray);
        //     return;
        // }
        // if (!window.confirm('タスクを登録しますか？')) {
        //     return
        // }
        // if (!registerMutation) {
        //     alert("リクエストの送信に失敗しました。");
        //     return;
        // }
        // let body: bodyObj = createRequestBody(refInfoArray);
        // //bodyの作成
        // registerMutation.mutate(body);
    }

    return {
        refInfoArray,
        isUpDelLoading: registerMutation.isLoading,
        backPageButtonObj: {
            title: `閉じる`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        negativeButtonObj: {
            title: `元に戻す`,
            type: `RUN`,
            onclick: refInfoArray && refInfoArray.default && refInfoArray.customAttribute ? clearButtonFunc : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `登録`,
            type: `RUN`,
            onclick: refInfoArray && refInfoArray.default && refInfoArray.customAttribute ? create : undefined
        } as buttonObjType,
        errMessage,
    }
}

export default useTaskEdit;