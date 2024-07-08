import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import useSwitch from "../../../Common/Hook/useSwitch";
import useQueryWrapper from "../../../Common/Hook/useQueryWrapper";
import { useState } from "react";
import { imageListResType } from "../Type/SettingUserType";
import { ICON_LIST_URL } from "../Const/SettingUserConst";


//引数の型
type prospType = {
    clickIcon?: (e: string,) => void,
}

function useSettingUserSelectStandardIcon(props: prospType) {

    //画像のクリックイベント
    function clickImg(url: string,) {
        if (props.clickIcon) {
            props.clickIcon(url);
        }
    }

    return {
        clickImg
    }
}

export default useSettingUserSelectStandardIcon;