import { RefObject, useContext, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import { taskListUrlAtom } from "./useTaskListContent";


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskSearch() {

    //登録するタスク内容
    const contentRef: RefObject<refType> = useRef(null);
    //タスクリスト取得用URL
    const setTaskListUrl = useSetAtom(taskListUrlAtom);

    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        let tmpUrl = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
        let query = "?";
        if (contentRef.current && contentRef.current?.refValue) {
            query += `content=${contentRef.current?.refValue}`;
        }
        if (query.length > 1) {
            tmpUrl += query;
        }
        //URLを更新
        setTaskListUrl(tmpUrl);
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        //入力値を初期化してタスクリストを取得する
        contentRef.current?.clearValue();
        setTaskListUrl(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`);
    }

    return {
        contentRef,
        clickSearchBtn,
        clickClearBtn
    };
}

export default useTaskSearch;