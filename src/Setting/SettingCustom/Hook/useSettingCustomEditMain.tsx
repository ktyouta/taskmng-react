import { useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";
import { createRef, useEffect, useMemo, useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { customAttributeType, inputRefType } from "../../Type/SettingType";
import ENV from '../../../env.json';
import { generalDataType, refInfoType } from "../../../Common/Type/CommonType";
import { radioType } from "../../../Common/LabelRadioListComponent";


function useSettingCustomEditMain() {

    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //編集モード
    const editMode = useAtomValue(editModeAtom);


    return {
        errMessage,
    }
}

export default useSettingCustomEditMain;