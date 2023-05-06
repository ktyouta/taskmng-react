import { useContext, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { taskListType } from "../Type/TaskType";



/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTask() {

    let taskListUrl = "";

    //画面に表示するマスタのボディ
    //選択中のマスタのデータを取得する
    // const { data: taskList } = useQueryWrapper<taskListType>(
    //     {
    //         url: taskListUrl,
    //     }
    // );

    return {
    };
}

export default useTask;