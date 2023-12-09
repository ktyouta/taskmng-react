import { useSetAtom } from "jotai";
import { userIdAtom, editModeAtom } from "./useSettingUser";
import { useNavigate } from "react-router-dom";
import { editModeEnum } from "../SettingUser";


function useSettingUserTop() {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //カスタム属性のID
    const setUserId = useSetAtom(userIdAtom);

    /**
     * 新規作成ボタン押下
     */
    const createNewUser = () => {
        setEditMode(editModeEnum.create);
        setUserId("");
        navigate(`/setting/custom/edit`);
    };

    return { createNewUser }
}

export default useSettingUserTop;