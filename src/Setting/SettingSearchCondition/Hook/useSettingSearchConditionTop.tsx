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
import { comboType } from "../../../Common/ComboComponent";
import useConstValue from "../../../Common/Hook/useConstValue";
import { DISP_MODE } from "../Const/SettingSearchConditionConst";



function useSettingSearchConditionTop() {

    //画面表示切替用リスト
    const comboList = useConstValue<comboType[]>({
        initValue: [
            {
                value: "1",
                label: "タスク"
            },
            {
                value: "2",
                label: "メモ"
            }
        ]
    });
    //画面の表示モード
    const [dispMode, setDispMode] = useState(DISP_MODE.task);


    //コンボボックスの切り替えイベント
    function changeCombo(value: string) {
        setDispMode(value);
    }

    return {
        comboList,
        changeCombo,
        dispMode
    }
}

export default useSettingSearchConditionTop;