import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { apiTaskDetailType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";
import { useSetAtom } from "jotai";
import { detailRoutingIdAtom } from "../Atom/TaskAtom";
import { DUMMY_ID } from "../Const/TaskConst";
import { VIEW_MODE } from "../../Common/Const/CommonConst";


//引数の型
type propsType = {
    updTaskId: string,
    closeFn?: () => void,
}


/**
 * useTaskEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useTaskDetail(props: propsType) {

    //閲覧モード(1:閲覧 2:編集)
    const [viewMode, setViewMode] = useState(1);
    //入力欄設定リスト
    const { taskSettingList } = useGetTaskInputSetting();
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //モーダル展開時に更新用タスクを取得
    const { data: updTask, isLoading: isLoadinGetUpdTask } = useQueryWrapper<apiTaskDetailType>(
        {
            url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${props.updTaskId}` : ``,
            afSuccessFn: (data) => {
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                //NotFound画面に遷移
                setDetailRoutingId(DUMMY_ID);
            }
        }
    );

    /**
     * 編集ボタン押下処理
     */
    const openEditPage = () => {
        setViewMode(VIEW_MODE.edit);
    }

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const openViewPage = () => {
        setViewMode(VIEW_MODE.view);
    }

    return {
        updTask,
        generalDataList,
        taskSettingList,
        viewMode,
        openViewPage,
        openEditPage,
    }
}

export default useTaskDetail;