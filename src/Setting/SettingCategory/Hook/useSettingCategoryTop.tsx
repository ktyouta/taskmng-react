import { useSetAtom } from "jotai";
import { categoryIdAtom, editModeAtom } from "./useSettingCategory";
import { useNavigate } from "react-router-dom";
import { editModeEnum } from "../SettingCategory";


//引数の型
type propsType = {
    path: string,
}

function useSettingCategoryTop(props: propsType) {

    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //ルーティング用
    const navigate = useNavigate();
    //カスタム属性のID
    const setCategoryId = useSetAtom(categoryIdAtom);

    /**
     * 新規作成ボタン押下
     */
    const createNewCategory = () => {
        setEditMode(editModeEnum.create);
        setCategoryId("");
        navigate(`${props.path}/edit`);
    };

    return { createNewCategory }
}

export default useSettingCategoryTop;