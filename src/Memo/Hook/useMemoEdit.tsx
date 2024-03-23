import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, viewMemoType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import { checkMemoRequest, createMemoRequestBody } from "../Function/MemoFunction";


//引数の型
type propsType = {
    updMemoId: string,
    backFn?: () => void,
    closeFn?: () => void,
    memoSettingList: inputMemoSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updMemo: apiMemoDetailType | undefined,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEdit(props: propsType) {

    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<editDisplayMemoType>();
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");

    //カスタム属性入力設定リスト
    const { data: customAttributeInputSetting } = useQueryWrapper<refInfoType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTEINPUTSETTING}`,
    });

    //入力欄参照用refの作成
    useEffect(() => {
        if (!props.memoSettingList) {
            return;
        }
        if (!props.updMemo) {
            return;
        }
        if (!props.generalDataList) {
            return;
        }
        if (!customAttributeInputSetting) {
            return;
        }

        //入力欄の参照を作成
        //setRefInfoArray(createUpdRefArray(props.memoSettingList, props.updMemo, props.generalDataList, customAttributeInputSetting));
    }, [props.memoSettingList, props.updMemo, props.generalDataList, customAttributeInputSetting]);

    //更新用フック
    const updMutation = useMutationWrapper({
        url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
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
        url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
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
        if (!refInfoArray || !refInfoArray.default || !refInfoArray.customAttribute) {
            return;
        }

        //入力チェック
        let errObj = checkMemoRequest(refInfoArray);
        if (errObj.errFlg) {
            setRefInfoArray(errObj.refInfoArray);
            return;
        }

        if (!window.confirm('メモを更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        //リクエストボディを作成
        updMutation.mutate(createMemoRequestBody(refInfoArray));
    }

    /**
     * 削除ボタン押下処理
     */
    const deleteMemo = () => {
        if (!refInfoArray || !refInfoArray.default || refInfoArray.default.length === 0 || !refInfoArray.customAttribute) {
            return;
        }
        if (!window.confirm('メモを削除しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        delMutation.mutate();
    }

    return {
        refInfoArray,
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
            onclick: refInfoArray && refInfoArray.default.length > 0 ? deleteMemo : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `更新`,
            type: `RUN`,
            onclick: refInfoArray && refInfoArray.default.length > 0 ? update : undefined
        } as buttonObjType,
        errMessage,
    }
}

export default useMemoEdit;