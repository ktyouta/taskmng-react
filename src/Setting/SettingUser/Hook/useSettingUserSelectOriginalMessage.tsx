import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editModeAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";
import useSwitch from "../../../Common/Hook/useSwitch";



function useSettingUserSelectOriginalMessage() {

    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();

    return {
        isModalOpen,
        onFlag,
        offFlag
    }
}

export default useSettingUserSelectOriginalMessage;