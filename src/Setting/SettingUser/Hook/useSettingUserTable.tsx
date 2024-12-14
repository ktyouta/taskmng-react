import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { userType } from "../Type/SettingUserType";
import { editModeAtom, settingUserAuthorityAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { editModeEnum } from "../../Const/SettingConst";


//引数の型
type propsType = {
    path: string,
}

function useSettingUserTable(props: propsType) {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //選択ユーザーのID
    const setUserId = useSetAtom(userIdAtom);
    //ユーザー設定画面の権限
    const settingUserAuth = useAtomValue(settingUserAuthorityAtom);


    //ユーザー情報のリストを取得する
    const { data: userInfoList, isLoading } = useQueryWrapper<userType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGUSER}`,
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
        setUserId(id);
        setEditMode(editModeEnum.update);
        navigate(`${props.path}/edit`);
    };

    return {
        userInfoList,
        isLoading,
        errMessage,
        clickId,
        settingUserAuth
    }

}

export default useSettingUserTable;
