import { useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";


function useSettingCustomTop() {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();

    /**
     * 新規作成ボタン押下
     */
    const createNewCustomAttribute = () => {
        setEditMode(editModeEnum.create);
        navigate(`/setting/custom/edit`);
    };

    return { createNewCustomAttribute }
}

export default useSettingCustomTop;