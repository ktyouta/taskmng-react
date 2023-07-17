import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";


function useSettingCustomEdti() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //ルーティング用
    const navigate = useNavigate();

    //モーダル展開時に更新用タスクを取得
    // const { data: updTask, isLoading: isLoadinGetUpdTask } = useQueryWrapper<taskListType>(
    //     {
    //         url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}/${props.updTaskId}` : ``,
    //         afSuccessFn: (data) => {
    //             setErrMessage("");
    //         }
    //         , afErrorFn: (res) => {
    //             let tmp = res as errResType;
    //             setErrMessage(tmp.response.data.errMessage);
    //         }
    //     }
    // );

    useEffect(() => {
        //更新モードでIDが存在しない
        if (editMode === editModeEnum.update && !customAttributeId) {
            navigate(`/setting/custom`);
        }
    }, []);
}

export default useSettingCustomEdti;