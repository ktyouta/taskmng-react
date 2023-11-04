import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { apiTaskDetailType, taskListType } from "../Type/TaskType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { buttonObjType } from "../../Master/MasterEditFooter";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetTaskInputSetting from "./useGetTaskInputSetting";


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

    //スナックバーに表示する登録更新時のエラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //閲覧モード(1:閲覧 2:編集)
    const [viewMode, setViewMode] = useState(1);
    //入力欄設定リスト
    const { taskSettingList } = useGetTaskInputSetting();

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //モーダル展開時に更新用タスクを取得
    const { data: updTask, isLoading: isLoadinGetUpdTask } = useQueryWrapper<apiTaskDetailType>(
        {
            url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${props.updTaskId}` : ``,
            afSuccessFn: (data) => {
                setErrMessage("");
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                setErrMessage(tmp.response.data.errMessage);
            }
        }
    );

    /**
     * 編集ボタン押下処理
     */
    const openEditPage = () => {
        setViewMode(2);
    }

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const openViewPage = () => {
        setViewMode(1);
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