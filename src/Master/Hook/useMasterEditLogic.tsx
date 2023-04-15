import { createRef, RefObject, useContext, useEffect, useMemo } from "react";
import { editModeAtom, editModeEnum, selectedDataElementsAtom, selectedMasterAtom } from "../Master";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { inputSettingType, refInfoType } from "../Type/MasterType";
import { createJsonData, postJsonData } from "../../Common/Function/Function";
import ENV from '../../env.json';
import { bodyObj } from "../../Common/Type/CommonType";
import { useCookies } from "react-cookie";
import { refType } from "../../Common/BaseInputComponent";
import { useAtom, useAtomValue } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";


//返り値の型
type retType = {
    refInfoArray: refInfoType[]
    buttonTitle: string | undefined,
    backPageButtonFunc: () => void,
    runButtonFunc: (() => void) | undefined,
    clearButtonFunc: () => void | undefined,
}


/**
 * 入力欄設定リストを作成
 * @param data 
 * @returns 
 */
function createInputSettingList(data: { inputsetting: inputSettingType[] }): inputSettingType[] {
    return data.inputsetting;
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
    const selectedMaster = useAtom(selectedMasterAtom);
    //テーブルで選択したデータ
    const selectedDataElements = useAtomValue(selectedDataElementsAtom);
    //認証クッキー
    const [cookie] = useCookies();

    //入力欄設定リスト
    const { data: inputsSettingList } = useQueryWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETINPUTSETTING}`,
        callback: createInputSettingList
    });


    //入力欄参照用refの作成
    const refInfoArray: refInfoType[] = useMemo(() => {
        let tmpRefInfoArray: refInfoType[] = [];
        if (!inputsSettingList) {
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
                lenght: element.length,
                //キーに一致するデータが存在する場合はその値を表示
                value: tmpValue ?? element.value,
                //閲覧モードの場合は全項目編集不可
                editFlg: editMode !== editModeEnum.view && element.isEditable,
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
        if (!window.confirm('データを登録しますか？')) {
            return
        }
        let body: bodyObj = {};
        refInfoArray.forEach((element) => {
            console.log("inputvalue:" + element.ref?.current?.refValue);
            body[element.id] = element.ref?.current?.refValue;
        });
        body['master'] = selectedMaster;
        postJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.POSTMATERCREATE}`, cookie[ENV.AUTHENTICATION.cookie], body);
        navigate(`/master`);
    }

    /**
     * 更新ボタン押下処理
     */
    const update = () => {
        if (!window.confirm('データを更新しますか？')) {
            return
        }
        let body: bodyObj = {};
        refInfoArray.forEach((element) => {
            console.log("inputvalue:" + element.ref?.current?.refValue);
        });
        body['master'] = selectedMaster;
        navigate(`/master`);
    }

    /**
     * 実行ボタンタイトル
     */
    const buttonTitle = useMemo(() => {
        switch (editMode) {
            //閲覧
            case editModeEnum.view:
                return;
            //登録
            case editModeEnum.create:
                return "登録";
            //更新
            case editModeEnum.update:
                return "更新";
            default:
                return;
        }
    }, []);

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
    }, []);

    return { refInfoArray, buttonTitle: buttonTitle, backPageButtonFunc, runButtonFunc, clearButtonFunc }
}

export default useMasterEditLogic;