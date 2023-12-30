import { useSetAtom } from "jotai";
import { categoryIdAtom, editModeAtom } from "./useSettingCategory";
import { useNavigate } from "react-router-dom";
import { editModeEnum } from "../SettingCategory";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { categoryType, refCategoryInfoType } from "../Type/SettingCategoryType";
import ENV from '../../../env.json';
import { createRef, useEffect, useState } from "react";


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
    //入力参照用リスト
    const [refInfoArray, setRefInfoArray] = useState<refCategoryInfoType[]>();

    //カテゴリのリストを取得する
    const { data: categoryInfoList, isLoading } = useQueryWrapper<categoryType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
            //失敗後の処理
            afErrorFn: (res: unknown) => { },
        }
    );

    //参照用のリストを作成
    useEffect(() => {
        if (!categoryInfoList) {
            return;
        }
        let tmp: refCategoryInfoType[] = [];
        categoryInfoList.forEach((element) => {
            return tmp.push({
                id: element.id,
                path: element.path,
                name: element.name,
                order: element.order,
                isHidden: element.isHidden,
                ref: createRef()
            });
        });
        setRefInfoArray(tmp);
    }, [categoryInfoList]);

    /**
     * 新規作成ボタン押下
     */
    const createNewCategory = () => {
        setEditMode(editModeEnum.create);
        setCategoryId("");
        navigate(`${props.path}/edit`);
    };

    /**
     * カテゴリの表示順を変更する
     */
    const changeCategoryOrder = () => {

    }

    return {
        createNewCategory,
        changeCategoryOrder,
        refInfoArray,
        isLoading
    }
}

export default useSettingCategoryTop;