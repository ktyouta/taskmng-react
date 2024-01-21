import { createRef, RefObject, useContext, useEffect, useMemo, useState } from "react";
import { editModeAtom, editModeEnum, selectedDataElementsAtom, selectedMasterAtom, selectedMasterNmAtom } from "../Master";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { createJsonData, createRequestBody } from "../../Common/Function/Function";
import ENV from '../../env.json';
import { bodyObj, inputMasterSettingType, inputSettingType, refInfoType } from "../../Common/Type/CommonType";
import { useCookies } from "react-cookie";
import { refType } from "../../Common/BaseInputComponent";
import { useAtom, useAtomValue } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import { buttonObjType } from "../MasterEditFooter";


//返り値の型
type retType = {
    refInfoArray: refInfoType[]
    title: string,
    isLoading: boolean,
    updErrMessage: string,
    backPageButtonObj: buttonObjType,
    negativeButtonObj: buttonObjType,
    positiveButtonObj: buttonObjType,
}


/**
 * 入力欄設定リストを作成
 * @param data 
 * @returns 
 */
function createInputSettingList(data: inputSettingType): inputMasterSettingType[] {
    return data.inputMasterSetting;
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMasterEditLogic(): retType {

    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //現在選択しているマスタ
    const selectedMaster = useAtomValue(selectedMasterAtom);
    //現在選択(テーブルに表示)しているマスタの名称
    const selectedMasterNm = useAtomValue(selectedMasterNmAtom);
    //テーブルで選択したデータ
    const selectedDataElements = useAtomValue(selectedDataElementsAtom);
    //スナックバーに表示する登録更新時のエラーメッセージ
    const [updErrMessage, setUpdErrMessage] = useState(``);

    //入力欄設定リスト
    const { data: inputsSettingList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.INPUTSETTING}`,
        callback: createInputSettingList
    });

    //登録更新メソッド
    const methodNm = useMemo(() => {
        switch (editMode) {
            case editModeEnum.create:
                return "POST";
            case editModeEnum.update:
                return "PUT";
        };
    }, []);

    //登録更新用フック
    const mutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTER}`,
        method: methodNm,
        queryKey: [`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTER}?filename=${selectedMaster}`],
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            //メッセージを表示してマスタトップ画面に遷移する
            navigate(`/master`);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            setUpdErrMessage(res.response.data.errMessage);
        },
    });

    //入力欄参照用refの作成
    const refInfoArray: refInfoType[] = useMemo(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!inputsSettingList ||
            inputsSettingList.length === 0
        ) {
            return tmpRefInfoArray;
        }
        inputsSettingList.forEach((element) => {
            let tmpValue: string | undefined = undefined;
            for (const [columnKey, value] of Object.entries(selectedDataElements as {})) {
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
            else if (editMode === editModeEnum.create) {
                isVisible = element.isNewCreateVisible;
            }
            tmpRefInfoArray.push({
                id: element.id,
                name: element.name,
                type: element.type,
                length: element.length,
                //キーに一致するデータが存在する場合はその値を表示
                initValue: tmpValue ?? element.value,
                //閲覧モードの場合は全項目編集不可
                disabled: editMode !== editModeEnum.view && element.disabled,
                visible: isVisible,
                ref: createRef(),
            });
        });
        return tmpRefInfoArray;
    }, [inputsSettingList]);

    /**
     * 戻るボタン押下処理
     */
    const backPageButtonFunc = () => {
        navigate(`/master`);
    }

    /**
     * 入力値の初期化
     */
    const clearButtonFunc = () => {
        if (!window.confirm("入力を元に戻しますか？")) {
            return;
        }
        refInfoArray.forEach((element) => {
            element.ref.current?.clearValue();
        });
    }

    /**
     * 登録押下処理
     */
    const create = () => {
        if (!refInfoArray || refInfoArray.length === 0) {
            return;
        }
        if (!window.confirm('データを登録しますか？')) {
            return
        }
        if (!mutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        let body: bodyObj = {};
        //bodyの作成
        refInfoArray.forEach((element) => {
            let postValue: string | undefined = element.initValue;
            if (element.ref && element.ref.current) {
                postValue = element.ref?.current?.refValue;
            }
            body[element.id] = postValue;
        });
        body['masternm'] = selectedMaster;
        mutation.mutate(body);
    }

    /**
     * 更新ボタン押下処理
     */
    const update = () => {
        if (!refInfoArray || refInfoArray.length === 0) {
            return;
        }
        if (!window.confirm('データを更新しますか？')) {
            return
        }
        if (!mutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }
        //bodyの作成
        let body: bodyObj = createRequestBody(refInfoArray);
        body['masternm'] = selectedMaster;
        mutation.mutate(body);
    }

    /**
     * 実行ボタンタイトル
     */
    let buttonTitle = "";
    switch (editMode) {
        //閲覧
        case editModeEnum.view:
            break;
        //登録
        case editModeEnum.create:
            buttonTitle = "登録";
            break;
        //更新
        case editModeEnum.update:
            buttonTitle = "更新";
            break;
        default:
            break;
    }

    /**
    * 登録更新ボタンイベント
    */
    const runButtonFunc = useMemo(() => {
        switch (editMode) {
            //閲覧
            case editModeEnum.view:
                return;
            //登録
            case editModeEnum.create:
                return create;
            //更新
            case editModeEnum.update:
                return update;
            default:
                return;
        }
    }, [refInfoArray]);

    return {
        refInfoArray,
        title: selectedMaster && selectedMasterNm ? `ファイル名：${selectedMaster}.json（${selectedMasterNm}）` : ``,
        isLoading: mutation.isLoading,
        updErrMessage,
        backPageButtonObj: { title: `戻る`, type: `BASE`, onclick: backPageButtonFunc },
        negativeButtonObj: { title: `元に戻す`, type: `RUN`, onclick: clearButtonFunc },
        positiveButtonObj: { title: buttonTitle, type: `RUN`, onclick: runButtonFunc },
    }
}

export default useMasterEditLogic;