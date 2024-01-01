import { createRef, RefObject, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { createJsonData, createRequestBody } from "../../Common/Function/Function";
import ENV from '../../env.json';
import { bodyObj, inputAddMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { useCookies } from "react-cookie";
import { refType } from "../../Common/BaseInputComponent";
import { useAtom, useAtomValue } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import { addDataInputBodyAtom } from "../AddMaster";
import { buttonObjType } from "../../Master/MasterEditFooter";


//引数の型
type propsType = {
    addMasterSummarySetting: inputAddMasterSettingType[] | undefined
}

//返り値の型
type retType = {
    summaryInputRefArray: refInfoType[]
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useAddMasterTop(props: propsType): retType {

    //ルーティング用
    const navigate = useNavigate();
    //入力欄用
    const [summaryInputRefArray, setSummaryInputRefArray] = useState<refInfoType[]>([]);
    //概要画面の入力値(POST用のボディ)
    const [summaryInputBody, setSummaryInputBody] = useAtom(addDataInputBodyAtom);

    //入力項目設定値の作成
    useEffect(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!props.addMasterSummarySetting) {
            return;
        }
        props.addMasterSummarySetting.forEach((element) => {
            let tmpValue: string | undefined = undefined;
            let isVisible = true;
            //項目の表示非表示
            if (element.isHidden) {
                isVisible = false;
            }
            //入力値と一致するキーが存在する
            if (element.id in summaryInputBody) {
                tmpValue = summaryInputBody[element.id]
            }
            tmpRefInfoArray.push({
                id: element.id,
                name: element.name,
                type: element.type,
                length: element.length,
                //キーに一致するデータが存在する場合はその値を表示
                value: tmpValue ?? element.value,
                //閲覧モードの場合は全項目編集不可
                disabled: element.disabled,
                visible: isVisible,
                ref: createRef(),
            });
        });
        setSummaryInputRefArray(tmpRefInfoArray);
    }, [props.addMasterSummarySetting]);


    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        summaryInputRefArray.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    /**
     * 次へボタン押下処理
     */
    const nextPage = () => {
        if (!summaryInputRefArray) {
            return;
        }
        //入力値を保存する
        let body: bodyObj = createRequestBody(summaryInputRefArray);
        setSummaryInputBody(body);
        navigate(`/addmaster/data`);
    }

    return {
        summaryInputRefArray,
        negativeButtonObj: { title: `元に戻す`, type: `RUN`, onclick: clearButtonFunc },
        positiveButtonObj: { title: `次へ`, type: `RUN`, onclick: nextPage },
    }
}

export default useAddMasterTop;