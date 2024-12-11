import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import { editModeAtom, userIdAtom } from "../../Setting/SettingUser/Atom/SettingUserAtom";
import useQueryWrapper, { errResType } from "../../Common/Hook/useQueryWrapper";
import { buttonObjType, generalDataType } from "../../Common/Type/CommonType";
import { updUserType, userType } from "../../Setting/SettingUser/Type/SettingUserType";
import { radioType } from "../../Common/LabelRadioListComponent";
import { editModeEnum } from "../../Setting/Const/SettingConst";
import { AUTH_ID } from "../../Setting/SettingUser/Const/SettingUserConst";
import useMutationWrapper, { resType } from "../../Common/Hook/useMutationWrapper";
import ENV from '../../env.json';
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { HOME_PATH, NOWPATH_STRAGEKEY } from "../../Header/Const/HeaderConst";
import useSettingUserEdit from "../../Setting/SettingUser/Hook/useSettingUserEdit";


//引数の型
type propsType = {
    path: string,
}

function useUserTop(props: propsType) {

    const {
        userId,
        registerTime,
        updTime,
        orgIconUrl,
        isLoadinGetuser,
        runButtonObj,
        editMode,
        isEditable,
        isUpdLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
    } = useSettingUserEdit({ ...props });

    //ルーティング用
    const navigate = useNavigate();

    /**
     * 戻るイベント
     */
    const backPage = () => {
        //ローカルストレージから遷移前の画面のパスを取得する
        let nowPath = localStorage.getItem(NOWPATH_STRAGEKEY);
        if (!nowPath) {
            //遷移前のパスが取得できなかった場合はホーム画面に遷移する
            nowPath = HOME_PATH;
        }
        navigate(nowPath);
    }

    return {
        userId,
        registerTime,
        orgIconUrl,
        updTime,
        isLoadinGetuser,
        positiveButtonObj: {
            title: '戻る',
            type: "GRAD_GRAY",
            onclick: backPage
        } as buttonObjType,
        runButtonObj,
        editMode,
        isEditable,
        isUpdLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
    }
}

export default useUserTop;