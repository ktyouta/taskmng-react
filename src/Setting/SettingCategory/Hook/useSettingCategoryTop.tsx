import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { editModeEnum } from "../SettingCategory";
import useQueryWrapper, { errResType } from "../../../Common/Hook/useQueryWrapper";
import { categoryType, refCategoryInfoType } from "../Type/SettingCategoryType";
import ENV from '../../../env.json';
import { createRef, useEffect, useState } from "react";
import useMutationWrapper, { resType } from "../../../Common/Hook/useMutationWrapper";
import { categoryIdAtom, editModeAtom } from "../Atom/SettingCategoryAtom";


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

    //更新用フック
    const updMutation = useMutationWrapper({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORYORDER}`,
        method: "PUT",
        //正常終了後の処理
        afSuccessFn: (res: resType) => {
            alert(res.errMessage);
        },
        //失敗後の処理
        afErrorFn: (res: errResType) => {
            //エラーメッセージを表示
            alert(res.response.data.errMessage);
        },
    });

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
        let body: { id: string, order: string }[] = [];
        if (!refInfoArray) {
            return;
        }
        if (!(window.confirm("表示順を更新しますか？"))) {
            return;
        }
        //表示順の重複チェック
        let tmp = refInfoArray.map((element) => {
            return element.ref.current?.refValue ?? "";
        }).filter((x, i, self) => {
            return self.indexOf(x) !== self.lastIndexOf(x);
        });
        if (tmp.length > 0) {
            alert("表示順が重複しています。");
            return;
        }

        refInfoArray.forEach((element) => {
            body.push({
                id: element.id,
                order: element.ref.current?.refValue ?? "",
            });
        });
        updMutation.mutate(body);
    }

    return {
        createNewCategory,
        changeCategoryOrder,
        refInfoArray,
        isLoading
    }
}

export default useSettingCategoryTop;