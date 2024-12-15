import { useAtomValue, useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editModeAtom, settingUserAuthorityAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";


//引数の型
type propsType = {
    path: string,
}

function useSettingUserTop(props: propsType) {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //カスタム属性のID
    const setUserId = useSetAtom(userIdAtom);
    //ユーザー設定画面の権限
    const settingUserAuth = useAtomValue(settingUserAuthorityAtom);


    /**
     * 新規作成ボタン押下
     */
    const createNewUser = () => {
        setEditMode(editModeEnum.create);
        setUserId("");
        navigate(`${props.path}/edit`);
    };

    return {
        createNewUser,
        settingUserAuth
    }
}

export default useSettingUserTop;