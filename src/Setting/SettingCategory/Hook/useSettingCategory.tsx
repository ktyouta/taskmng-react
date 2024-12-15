import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { categoryIdAtom, editModeAtom, settingCategoryAuthorityAtom } from "../Atom/SettingCategoryAtom";
import useSetMenuAuthEffect from "../../../Common/Hook/useSetMenuAuthEffect";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userAuthListAtom } from "../../../Content/Atom/ContentAtom";


//引数の型
type propsType = {
    menuId: string,
}


function useSettingCategory(props: propsType) {

    //権限リスト
    const userAuthList = useGlobalAtomValue(userAuthListAtom);
    //カテゴリ画面の権限
    const setSettingCustomAuthority = useSetAtom(settingCategoryAuthorityAtom);


    //カテゴリ画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setSettingCustomAuthority,
        authList: userAuthList,
        menuId: props.menuId
    });

}

export default useSettingCategory;
