import { createRef, RefObject, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { createJsonData, createRequestBody, postJsonData } from "../../Common/Function/Function";
import ENV from '../../env.json';
import { bodyObj, inputMasterSettingType, inputSettingType, refInfoType } from "../../Common/Type/CommonType";
import { useCookies } from "react-cookie";
import { refType } from "../../Common/BaseInputComponent";
import { useAtom, useAtomValue } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import { addDataInputBodyAtom, summaryInputBodyAtom } from "../AddMaster";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { postAddMasterBodyType } from "../Type/AddMasterType";


//引数の型
type propsType = {
    inputsSettingList: inputMasterSettingType[] | undefined
}

//返り値の型
type retType = {
    addDataInputRefArray: refInfoType[],
    isLoading: boolean,
    updErrMessage: string,
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useAddMasterData(props: propsType): retType {

    //ルーティング用
    const navigate = useNavigate();
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [updErrMessage, setUpdErrMessage] = useState(``);
    //入力欄用
    const [addDataInputRefArray, setAddDataInputRefArray] = useState<refInfoType[]>([]);
    //新規データ追加画面の入力値(POST用のボディ保存用)
    const [addDataInput, setAddDataInput] = useAtom(summaryInputBodyAtom);
    //概要画面の入力値(POST用のボディ)
    const [summaryInputBody, setSummaryInputBody] = useAtom(addDataInputBodyAtom);

    //登録更新用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTERTABLE}`,
        method: "POST",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            setSummaryInputBody({});
            setAddDataInput({});
            navigate(`/addmaster`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setUpdErrMessage(res.response.data.errMessage);
        },
    });

    //入力項目設定値の作成
    useEffect(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!props.inputsSettingList) {
            return;
        }
        props.inputsSettingList.forEach((element) => {
            let tmpValue: string | undefined = undefined;
            //入力値と一致するキーが存在する
            if (element.id in addDataInput) {
                tmpValue = addDataInput[element.id]
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
                visible: element.isNewCreateVisible,
                ref: createRef(),
            });
        });
        setAddDataInputRefArray(tmpRefInfoArray);
    }, [props.inputsSettingList]);

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        addDataInputRefArray.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    /**
     * 登録押下処理
     */
    const create = () => {
        if (!addDataInputRefArray) {
            return;
        }
        if (!window.confirm('データを登録しますか？')) {
            return
        }
        if (!mutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        //POSTリクエスト用ボディ
        let postBody: postAddMasterBodyType = {
            summary: {},
            data: {}
        };
        //bodyの作成
        let addDataBody: bodyObj = createRequestBody(addDataInputRefArray);
        postBody = { summary: summaryInputBody, data: addDataBody }
        mutation.mutate(postBody);
    }

    /**
     * 戻るボタン押下処理
     */
    const backPageButtonFunc = () => {
        //リクエストボディの作成
        let body: bodyObj = createRequestBody(addDataInputRefArray);
        setAddDataInput(body);
        navigate(`/addmaster`);
    }

    return {
        addDataInputRefArray,
        isLoading: mutation.isLoading,
        updErrMessage,
        backPageButtonObj: { title: `戻る`, type: `BASE`, onclick: backPageButtonFunc },
        negativeButtonObj: { title: `元に戻す`, type: `RUN`, onclick: clearButtonFunc },
        positiveButtonObj: { title: `登録`, type: `RUN`, onclick: create },
    }
}

export default useAddMasterData;