import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { defaultAttributeType } from "../Type/SettingDefaultType";
import useGetTaskInputSetting from "../../../Task/Hook/useGetTaskInputSetting";
import { defaultAttributeIdAtom, editModeAtom, settingDefaultAuthorityAtom } from "../Atom/SettingDefaultAtom";
import { editModeEnum } from "../../Const/SettingConst";


//引数の型
type propsType = {
    path: string,
}

function SettingDefaultTable(props: propsType) {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //デフォルト属性のID
    const setDefaultAttributeId = useSetAtom(defaultAttributeIdAtom);
    //デフォルト属性画面の権限
    const settingDefalutAuth = useAtomValue(settingDefaultAuthorityAtom);

    //入力欄設定リスト
    const { taskSettingList, isLoading } = useGetTaskInputSetting();

    //IDのクリックイベント
    const clickId = (id: string) => {
        setDefaultAttributeId(id);
        setEditMode(editModeEnum.update);
        navigate(`${props.path}/edit`);
    };

    return {
        taskSettingList,
        isLoading,
        errMessage,
        clickId,
        settingDefalutAuth
    }

}

export default SettingDefaultTable;
