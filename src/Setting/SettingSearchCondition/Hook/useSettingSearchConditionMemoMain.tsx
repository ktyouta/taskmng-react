import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../../env.json';
import { buttonObjType, refInfoType } from "../../../Common/Type/CommonType";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../../../Task/Const/TaskConst";
import { useAtom } from "jotai";
import useMutationWrapper, { errResType, resType } from "../../../Common/Hook/useMutationWrapper";
import { memoSearchConditionType } from "../../../Memo/Type/MemoType";
import { createRequestBody } from "../../../Common/Function/Function";
import { createSearchRefArray } from "../../../Memo/Function/MemoFunction";
import { createMemoSearchRefArray } from "../Function/SettingSearchConditionFunction";



function useSettingSearchConditionMemoMain() {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //検索条件参照用リスト
    const [memoSearchRefInfo, setTaskSearchRefInfo] = useState<refInfoType[]>([]);

    //検索条件の設定リスト
    const { isLoading } = useQueryWrapper<memoSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOSEARCHCONDITION}`,
        afSuccessFn: (data: memoSearchConditionType[]) => {
            //検索条件の参照リストを作成
            setTaskSearchRefInfo(createMemoSearchRefArray(data));
        },
        //失敗後の処理
        afErrorFn: (res: unknown) => {
            let tmp = res as errResType;
            //エラーメッセージを表示
            setErrMessage(tmp.response.data.errMessage);
        },
    });

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOSEARCHCONDITION}`,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });

    /**
     * 更新ボタン押下処理
     */
    const updButtonFunc = () => {
        if (!window.confirm('検索条件の初期値を更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        //リクエストボディの作成
        let body = createRequestBody(memoSearchRefInfo);
        updMutation.mutate(body);
    }

    return {
        backPageButtonObj: {
            title: `初期設定を更新`,
            type: `GRAD_BLUE`,
            onclick: updButtonFunc
        } as buttonObjType,
        isLoading,
        errMessage,
        isUpdLoading: updMutation.isLoading,
        memoSearchRefInfo,
    }
}

export default useSettingSearchConditionMemoMain;