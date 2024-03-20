import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { apiMemoDetailType, customAttributeListType, displayMemoType, inputMemoSettingType, memoListType, viewMemoType } from "../Type/MemoType";
import { createMemoViewList } from "../Function/MemoFunction";


//引数の型
type propsType = {
    memoSettingList: inputMemoSettingType[] | undefined,
    generalDataList: generalDataType[] | undefined,
    updMemo: apiMemoDetailType | undefined,
    openEditPage: () => void,
    closeFn?: () => void,
    backBtnTitle?: string,
}


/**
 * useMemoViewコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoView(props: propsType) {

    //閲覧用メモ
    const [viewMemo, setViewMemo] = useState<displayMemoType>();

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

        //メモの詳細リストを作成
        setViewMemo(createMemoViewList(props.memoSettingList, props.updMemo, props.generalDataList));
    }, [props.memoSettingList, props.updMemo, props.generalDataList]);


    /**
     * 閉じるボタン押下処理
     */
    const backPageButtonFunc = () => {
        if (props.closeFn) {
            props.closeFn();
        }
    }

    return {
        viewMemo,
        backPageButtonObj: {
            title: props.backBtnTitle ?? `戻る`,
            type: `BASE`,
            onclick: props.closeFn ? backPageButtonFunc : undefined
        } as buttonObjType,
        positiveButtonObj: {
            title: `編集`,
            type: `RUN`,
            onclick: props.openEditPage
        } as buttonObjType,
    }
}

export default useMemoView;