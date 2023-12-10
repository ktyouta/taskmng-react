import { useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";
import { useNavigate } from "react-router-dom";

//引数の型
type propsType = {
    url: string,
}

function useSettingCustomTop(props: propsType) {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //カスタム属性のID
    const setCustomAttributeId = useSetAtom(customAttributeIdAtom);

    /**
     * 新規作成ボタン押下
     */
    const createNewCustomAttribute = () => {
        setEditMode(editModeEnum.create);
        setCustomAttributeId("");
        navigate(`${props.url}/edit`);
    };

    return { createNewCustomAttribute }
}

export default useSettingCustomTop;