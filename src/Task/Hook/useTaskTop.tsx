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

    console.log("useTaskTop render");

    //タスクリスト取得用URL
    const taskListUrl = useAtomValue(taskListUrlAtom);
    //登録するタスク内容
    const contentRef: RefObject<refType> = useRef(null);

    //タスクリストを取得
    useQueryWrapper<taskListType>(
        {
            url: taskListUrl,
        }
    );

    return {
        contentRef,
    };
}

export default useTaskTop;