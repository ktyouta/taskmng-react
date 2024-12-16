import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { categoryType, refCategoryInfoType } from "../Type/SettingCategoryType";
import ENV from '../../../env.json';
import { createRef, useEffect, useMemo, useState } from "react";
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { categoryIdAtom, editModeAtom, settingCategoryAuthorityAtom } from "../Atom/SettingCategoryAtom";
import { editModeEnum } from "../../Const/SettingConst";
import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { checkAuthAction } from "../../../Common/Function/Function";



function useSettingCategoryEditMain() {

    //カテゴリ画面の権限
    const settingCateogryAuth = useAtomValue(settingCategoryAuthorityAtom);


    //管理者権限以上の編集可能フラグ
    const isEditableAuth = useMemo(() => {

        return checkAuthAction(settingCateogryAuth, USER_AUTH.ADMIN);
    }, [settingCateogryAuth]);


    return {
        settingCateogryAuth,
        isEditableAuth
    }
}

export default useSettingCategoryEditMain;