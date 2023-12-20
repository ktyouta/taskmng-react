import { useState } from "react";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import ENV from '../../../env.json';
import { useNavigate } from "react-router-dom";
import { useSetAtom } from "jotai";
import { categoryIdAtom, editModeAtom } from "./useSettingCategory";
import { editModeEnum } from "../SettingCategory";
import { categoryType } from "../Type/SettingCategoryType";


//引数の型
type propsType = {
    url: string,
}

function useSettingCategoryTable(props: propsType) {

    //エラーメッセージ
    const [errMessage, setErrMessage] = useState("");
    //ルーティング用
    const navigate = useNavigate();
    //編集モード
    const setEditMode = useSetAtom(editModeAtom);
    //カテゴリのID
    const setCategoryId = useSetAtom(categoryIdAtom);

    //カテゴリのリストを取得する
    const { data: categoryInfoList, isLoading } = useQueryWrapper<categoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
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
        setCategoryId(id);
        setEditMode(editModeEnum.update);
        navigate(`${props.url}/edit`);
    };

    return {
        categoryInfoList,
        isLoading,
        errMessage,
        clickId
    }

}

export default useSettingCategoryTable;
