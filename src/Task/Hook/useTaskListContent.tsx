import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { generalDataType, masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { displayTaskListType, taskContentDisplayType, taskContentSettingType, taskListType } from "../Type/TaskType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import ButtonComponent from "../../Common/ButtonComponent";
import { parseStrDate } from "../../Common/Function/Function";
import { createTaskContentList } from "../Function/TaskFunction";
import { detailRoutingIdAtom, taskListUrlAtom } from "../Atom/TaskAtom";



//引数の型
type propsType = {
    path: string,
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskListContent(props: propsType) {

    //タスクリスト取得用URL
    const taskListUrl = useAtomValue(taskListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //データの取得に失敗した場合のメッセージ
    const [errMessage, setErrMessage] = useState(``);
    //更新用タスクID
    const [updTaskId, setUpdTaskId] = useState(``);
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });
    //ルーティング用
    const navigate = useNavigate();

    //タスクリストを取得
    const { data: taskList, isLoading } = useQueryWrapper<taskListType[]>(
        {
            url: taskListUrl,
            afSuccessFn: () => { }
        }
    );

    //タスクの画面表示設定を取得
    const { data: taskContentSetting } = useQueryWrapper<taskContentSettingType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKCONTENTSETTING}`,
        }
    );

    //モーダルオープン
    const openModal = (id: string) => {
        //IDが存在しない
        if (!id) {
            setUpdTaskId(``);
            alert(`データの取得に失敗しました。`);
            return;
        }
        //更新用タスク取得ID
        setUpdTaskId(id)
        onFlag();
    };

    //タスクの詳細画面に遷移する
    const moveTaskDetail = (taskId: string,) => {
        setDetailRoutingId(taskId);
        navigate(`${props.path}/${taskId}`);
    };

    //取得したタスクリストを画面表示用に変換
    const displayTaskList = useMemo(() => {
        //タスクリスト
        if (!taskList) {
            return null;
        }
        //汎用リスト
        if (!generalDataList) {
            return null;
        }
        //タスクの画面表示設定リスト
        if (!taskContentSetting) {
            return null;
        }

        //コンテンツリストを作成
        return createTaskContentList(taskList, generalDataList, taskContentSetting, openModal, moveTaskDetail);
    }, [taskList, generalDataList, taskContentSetting]);

    return {
        isModalOpen,
        offFlag,
        displayTaskList,
        errMessage,
        updTaskId,
        isLoading,
    };
}

export default useTaskListContent;