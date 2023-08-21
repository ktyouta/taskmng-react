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
    //ルーティング用
    const navigate = useNavigate();

    useEffect(() => {
        //モード未選択状態
        if (editMode === editModeEnum.noselect) {
            navigate(`/setting/custom`);
        }
    }, []);

    /**
     * 戻るイベント
     */
    const backPage = () => {
        navigate(`/setting/custom`);
    };

    return {
        backPage
    }
}

export default useSettingCustomEdit;