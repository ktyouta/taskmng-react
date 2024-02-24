import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { editModeEnum } from "../SettingDefault";
import { defaultAttributeType } from "../Type/SettingDefaultType";
import useGetTaskInputSetting from "../../../Task/Hook/useGetTaskInputSetting";
import { defaultAttributeIdAtom, editModeAtom } from "../Atom/SettingDefaultAtom";


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

    //入力欄設定リスト
    const { taskSettingList, isLoading } = useGetTaskInputSetting();

    //IDのクリックイベント
    const clickId = (id: string) => {
        setDefaultAttributeId(id);
        setEditMode(editModeEnum.update);
        navigate(`${props.path}/edit`);
    };

    return { taskSettingList, isLoading, errMessage, clickId }

}

export default SettingDefaultTable;
