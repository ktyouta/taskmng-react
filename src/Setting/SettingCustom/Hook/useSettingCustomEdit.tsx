import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { customAttributeType } from "../../Type/SettingType";
import ENV from '../../../env.json';


function useSettingCustomEdit() {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //ルーティング用
    const navigate = useNavigate();

    useEffect(() => {
        //更新モードでIDが存在しない
        if (editMode === editModeEnum.update && !customAttributeId) {
            navigate(`/setting/custom`);
        }
    }, []);

}

export default useSettingCustomEdit;