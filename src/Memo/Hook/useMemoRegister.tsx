import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { customAttributeRequestBodyType, editDisplayMemoType, memoListType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import { checkMemoRequest, createCunstomAttributeEditList, createCunstomAttributeRegistList, createRegistRefArray, createMemoCustomAttributeRequestBody, createMemoRequestBody } from "../Function/MemoFunction";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";


//引数の型
type propsType = {
    path: string,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoRegister(props: propsType) {

    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<editDisplayMemoType>();
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //メモタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモ内容
    const [memoContent, setMemoContent] = useState("");


    //登録用フック
    const registerMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            navigate(`${props.path}`);
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
        navigate(`${props.path}`);
    }

    /**
     * 登録ボタン押下処理
     */
    const create = () => {
        if (!refInfoArray || !refInfoArray.default || refInfoArray.default.length === 0 || !refInfoArray.customAttribute) {
            return;
        }

        //入力チェック
        let errObj = checkMemoRequest(refInfoArray);
        if (errObj.errFlg) {
            setRefInfoArray(errObj.refInfoArray);
            return;
        }

        if (!window.confirm('メモを登録しますか？')) {
            return
        }
        if (!registerMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        //bodyの作成
        registerMutation.mutate(createMemoRequestBody(refInfoArray));
    }

    return {
        refInfoArray,
        isUpDelLoading: registerMutation.isLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `BASE`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        positiveButtonObj: {
            title: `登録`,
            type: `RUN`,
            onclick: create
        } as buttonObjType,
        errMessage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
    }
}

export default useMemoRegister;