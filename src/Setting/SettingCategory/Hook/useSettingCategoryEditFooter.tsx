import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { categoryType, refCategoryInfoType } from "../Type/SettingCategoryType";
import ENV from '../../../env.json';
import { createRef, useEffect, useState } from "react";
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { categoryIdAtom, editModeAtom, settingCategoryAuthorityAtom } from "../Atom/SettingCategoryAtom";
import { editModeEnum } from "../../Const/SettingConst";



function useSettingCategoryEditFooter() {

    //カテゴリ画面の権限
    const settingCateogryAuth = useAtomValue(settingCategoryAuthorityAtom);


    return {
        settingCateogryAuth
    }
}

export default useSettingCategoryEditFooter;