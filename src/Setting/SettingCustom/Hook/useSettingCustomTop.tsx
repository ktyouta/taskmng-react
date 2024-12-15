import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { customAttributeIdAtom, editModeAtom, settingCustomAuthorityAtom } from "../Atom/SettingCustomAtom";
import { editModeEnum } from "../../Const/SettingConst";

//引数の型
type propsType = {
    path: string,
}

function useSettingCustomTop(props: propsType) {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //カスタム属性のID
    const setCustomAttributeId = useSetAtom(customAttributeIdAtom);
    //カスタム属性画面の権限
    const settingCustomAttributeAuth = useAtomValue(settingCustomAuthorityAtom);


    /**
     * 新規作成ボタン押下
     */
    const createNewCustomAttribute = () => {
        setEditMode(editModeEnum.create);
        setCustomAttributeId("");
        navigate(`${props.path}/edit`);
    };

    return {
        createNewCustomAttribute,
        settingCustomAttributeAuth
    }
}

export default useSettingCustomTop;