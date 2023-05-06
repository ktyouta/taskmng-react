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
import { displayTaskListType, taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWapper";
import { taskListUrlAtom } from "./useTaskTop";
import useSwitch from "../../Common/Hook/useSwitch";


//画面表示用タスクリスト
export const displayTaskListAtom = atom<displayTaskListType[]>([]);


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskTop() {

    //タスクリスト取得用URL
    const taskListUrl = useAtomValue(taskListUrlAtom);
    //タスクリスト
    const taskList = useQueryClientWapper<taskListType>(taskListUrl);
    //画面表示用タスクリスト
    const [displayTaskList, setDisplayTaskList] = useAtom(displayTaskListAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();

    //取得したタスクリストを画面表示用に加工
    useEffect(() => {
        
    }, [taskList]);

    //モーダルオープン
    const openModal = ()=>{
        onFlag();
    };

    return {
        isModalOpen,
        offFlag,
        displayTaskList
    };
}

export default useTaskTop;