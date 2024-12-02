import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { customAttributeIdAtom, editModeAtom, settingCustomAuthorityAtom } from "../Atom/SettingCustomAtom";
import useSetMenuAuthEffect from "../../../Common/Hook/useSetMenuAuthEffect";
import { userAuthListAtom } from "../../../Content/Atom/ContentAtom";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";


//引数の型
type propsType = {
    menuId: string,
}


function useSettingCustom(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //カスタム属性のID
    const customAttributeId = useAtomValue(customAttributeIdAtom);
    //権限リスト
    const userAuthList = useGlobalAtomValue(userAuthListAtom);
    //カスタム属性画面の権限
    const setSettingCustomAuthority = useSetAtom(settingCustomAuthorityAtom);


    //カスタム属性画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setSettingCustomAuthority,
        authList: userAuthList,
        menuId: props.menuId
    });


    return { editMode, customAttributeId }

}

export default useSettingCustom;
