import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { categoryType } from "../Type/SettingCategoryType";
import { categoryIdAtom, editModeAtom, settingCategoryAuthorityAtom } from "../Atom/SettingCategoryAtom";
import { editModeEnum } from "../../Const/SettingConst";


//引数の型
type propsType = {
    path: string,
}

function useSettingCategoryTable(props: propsType) {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //カテゴリのpath
    const setCategoryId = useSetAtom(categoryIdAtom);
    //カテゴリ画面の権限
    const settingCateogryAuth = useAtomValue(settingCategoryAuthorityAtom);


    //PATHのクリックイベント
    const clickPath = (id: string) => {
        setCategoryId(id);
        setEditMode(editModeEnum.update);
        navigate(`${props.path}/edit`);
    };

    return {
        errMessage,
        clickPath,
        settingCateogryAuth,
    }

}

export default useSettingCategoryTable;
