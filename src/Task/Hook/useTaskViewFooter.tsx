import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, inputMasterSettingType, refInfoType } from "../../Common/Type/CommonType";
import { apiTaskDetailType, customAttributeListType, displayTaskType, inputTaskSettingType, taskListType, viewTaskType } from "../Type/TaskType";
import { createTaskViewList } from "../Function/TaskFunction";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { userInfoAtom } from "../../Content/Atom/ContentAtom";
import { USER_AUTH } from "../../Common/Const/CommonConst";


//引数の型
type propsType = {
    closeFn?: () => void,
    updTaskId: string,
}


/**
 * TaskViewFooterコンポーネントのビジネスロジック
 * @returns 
 */
function useTaskViewFooter(props: propsType) {

    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);


    //更新用フック
    const updMutation = useMutationWrapper({
        url: props.updTaskId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKRECOVERY}/${props.updTaskId}` : ``,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
            if (props.closeFn) props.closeFn();
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });


    /**
     * タスク復元処理
     * @returns 
     */
    const recoveryTask = () => {

        if (!window.confirm('削除済みのタスクを復元しますか？')) {
            return
        }

        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        updMutation.mutate();
    }


    /**
     * 復元可能フラグ
     */
    const isRestorableFlg = useMemo(() => {

        if (!userInfo) {
            return false;
        }

        return parseInt(userInfo.auth) > parseInt(USER_AUTH.MASTER);

    }, [userInfo]);


    return {
        recoveryButtonObj: {
            title: `復元`,
            type: `GRAD_BLUE`,
            onclick: recoveryTask
        } as buttonObjType,
        isRestorableFlg,
    }
}

export default useTaskViewFooter;