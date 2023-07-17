import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { customAttributeType } from "../../Type/SettingType";
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom } from "./useSettingCustom";
import { editModeEnum } from "../SettingCustom";


function SettingCustomTable() {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //カスタム属性のID
    const setCustomAttributeId = useSetAtom(customAttributeIdAtom);

    //カスタム属性のリストを取得する
    const { data: customAttributeList, isLoading } = useQueryWrapper<customAttributeType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CUSTOMATTRIBUTE}`,
            //失敗後の処理
            afErrorFn: (res: unknown) => {
                let tmp = res as errResType;
                //エラーメッセージを表示
                setErrMessage(tmp.response.data.errMessage);
            },
        }
    );

    //IDのクリックイベント
    const clickId = (id: string) => {
        setCustomAttributeId(id);
        setEditMode(editModeEnum.update);
        navigate(`/setting/custom/edit`);
    };

    return { customAttributeList, isLoading, errMessage, clickId }

}

export default SettingCustomTable;
