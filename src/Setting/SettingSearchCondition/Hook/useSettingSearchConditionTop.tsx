import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../../env.json';
import { createSearchDispCondition, createSearchRefArray, createSettingSearchRefArray, createTabItems } from "../../../Task/Function/TaskFunction";
import { taskSearchConditionRefType, taskSearchConditionType } from "../../../Task/Type/TaskType";
import { buttonObjType, refInfoType } from "../../../Common/Type/CommonType";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../../../Task/Const/TaskConst";
import useCreateDefaultTaskUrlCondition from "../../../Task/Hook/useCreateDefaultTaskUrlCondition";
import { useAtom } from "jotai";
import { taskSearchConditionObjAtom } from "../Atom/SettingSearchConditionAtom";
import useMutationWrapper, { errResType, resType } from "../../../Common/Hook/useMutationWrapper";
import { settingSearchConditionUpdReqType, settingSearchConditionUpdType } from "../Type/SettingSearchConditionType";



function useSettingSearchConditionTop() {

    //検索条件参照用リスト
    const [taskSearchRefInfo, setTaskSearchRefInfo] = useState<taskSearchConditionRefType>({
        default: [],
        custom: []
    });

    //検索条件の設定リスト
    useQueryWrapper<taskSearchConditionType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}${SEARCHCONDITION_QUERY_KEY}${SEARCHCONDITION_KEY_DEFAULT},${SEARCHCONDITION_KEY_CUSTOM}`,
        afSuccessFn: (data: taskSearchConditionType[]) => {
            //検索条件の参照リストを作成
            setTaskSearchRefInfo(createSettingSearchRefArray(data));
        }
    });

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
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

    //タブに表示する検索条件を作成する
    let searchConditionComponent = useMemo(() => {
        if (!taskSearchRefInfo) {
            return;
        }

        return createTabItems(taskSearchRefInfo);
    }, [taskSearchRefInfo]);

    /**
     * 更新ボタン押下処理
     */
    const updButtonFunc = () => {
        let body: settingSearchConditionUpdReqType = {
            condition: []
        };

        if (!window.confirm('検索条件の初期値を更新しますか？')) {
            return
        }
        if (!updMutation) {
            alert("リクエストの送信に失敗しました。");
            return;
        }

        //リクエストボディの作成
        body.condition = Object.keys(taskSearchRefInfo).flatMap((element) => {
            return taskSearchRefInfo[element];
        }).reduce((pre: settingSearchConditionUpdType[], element: refInfoType) => {
            pre.push({
                id: element.id,
                value: element.ref?.current?.refValue.trim() ?? ""
            });
            return pre;
        }, []);
        updMutation.mutate(body);
    }

    return {
        backPageButtonObj: {
            title: `初期設定を更新`,
            type: `RUN`,
            onclick: updButtonFunc
        } as buttonObjType,
        searchConditionComponent,
    }
}

export default useSettingSearchConditionTop;