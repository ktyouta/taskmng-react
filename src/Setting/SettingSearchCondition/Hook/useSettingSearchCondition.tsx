import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../../env.json';
import { createSearchDispCondition, createSearchRefArray, createSettingSearchRefArray, createTabItems } from "../../../Task/Function/TaskFunction";
import { taskSearchConditionRefType, taskSearchConditionType } from "../../../Task/Type/TaskType";
import { buttonObjType, refInfoType } from "../../../Common/Type/CommonType";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY } from "../../../Task/Const/TaskConst";
import { useAtom, useSetAtom } from "jotai";
import { memoAuthorityAtom, settingSearchConditionAuthorityAtom, taskAuthorityAtom, taskSearchConditionObjAtom } from "../Atom/SettingSearchConditionAtom";
import useMutationWrapper, { errResType, resType } from "../../../Common/Hook/useMutationWrapper";
import { settingSearchConditionUpdReqType, settingSearchConditionUpdType } from "../Type/SettingSearchConditionType";
import { comboType } from "../../../Common/ComboComponent";
import useConstValue from "../../../Common/Hook/useConstValue";
import { DISP_MODE } from "../Const/SettingSearchConditionConst";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userAuthListAtom } from "../../../Content/Atom/ContentAtom";
import useSetMenuAuthEffect from "../../../Common/Hook/useSetMenuAuthEffect";
import { CATEGORY_ID } from "../../../Common/Const/CommonConst";


//引数の型
type propsType = {
    menuId: string
}


function useSettingSearchCondition(props: propsType) {

    //権限リスト
    const userAuthList = useGlobalAtomValue(userAuthListAtom);
    //検索条件設定画面の権限
    const setSettingSearchConditionAuthority = useSetAtom(settingSearchConditionAuthorityAtom);
    //タスク画面の権限
    const setTaskAuthority = useSetAtom(taskAuthorityAtom);
    //タスク画面の権限
    const setMemoAuthority = useSetAtom(memoAuthorityAtom);


    //検索条件設定画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setSettingSearchConditionAuthority,
        authList: userAuthList,
        menuId: props.menuId
    });

    //タスク画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setTaskAuthority,
        authList: userAuthList,
        menuId: CATEGORY_ID.TASK
    });

    //メモ画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setMemoAuthority,
        authList: userAuthList,
        menuId: CATEGORY_ID.MEMO
    });

}

export default useSettingSearchCondition;