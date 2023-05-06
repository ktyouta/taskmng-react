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


//タスクリスト取得用URL
export const taskListUrlAtom = atom(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`);


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskTop() {

    //タスクリスト取得用URL
    const [taskListUrl, setTaskListUrl] = useAtom(taskListUrlAtom);
    //登録するタスク内容
    const contentRef: RefObject<refType> = useRef(null);


    //タスクリストを取得
    const { data: taskList } = useQueryWrapper<taskListType>(
        {
            url: taskListUrl,
        }
    );

    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        contentRef.current?.clearValue();
    }

    return {
        contentRef,
        clickSearchBtn,
        clickClearBtn
    };
}

export default useTaskTop;