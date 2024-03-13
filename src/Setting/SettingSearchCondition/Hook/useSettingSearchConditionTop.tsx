import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../../env.json';
import { createSearchDispCondition, createSearchRefArray, createSettingSearchRefArray, createTabItems } from "../../../Task/Function/TaskFunction";
import { taskSearchConditionRefType, taskSearchConditionType } from "../../../Task/Type/TaskType";
import { buttonObjType } from "../../../Common/Type/CommonType";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../../../Task/Const/TaskConst";
import useCreateDefaultTaskUrlCondition from "../../../Task/Hook/useCreateDefaultTaskUrlCondition";
import { useAtom } from "jotai";
import { taskSearchConditionObjAtom } from "../Atom/SettingSearchConditionAtom";



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

    }

    return {
        backPageButtonObj: {
            title: `初期設定を更新`,
            type: `BASE`,
            onclick: updButtonFunc
        } as buttonObjType,
        searchConditionComponent,
    }
}

export default useSettingSearchConditionTop;