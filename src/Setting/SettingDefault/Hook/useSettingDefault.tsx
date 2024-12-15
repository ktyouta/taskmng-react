import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { defaultAttributeIdAtom, editModeAtom, settingDefaultAuthorityAtom } from "../Atom/SettingDefaultAtom";
import useSetMenuAuthEffect from "../../../Common/Hook/useSetMenuAuthEffect";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userAuthListAtom } from "../../../Content/Atom/ContentAtom";


//引数の型
type propsType = {
    menuId: string,
}


function useSettingDefault(props: propsType) {

    //編集モード
    const editMode = useAtomValue(editModeAtom);
    //デフォルト属性のID
    const defaultAttributeId = useAtomValue(defaultAttributeIdAtom);
    //デフォルト属性画面の権限
    const setSettingDefaultAuthority = useSetAtom(settingDefaultAuthorityAtom);
    //権限リスト
    const userAuthList = useGlobalAtomValue(userAuthListAtom);


    //デフォルト属性画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setSettingDefaultAuthority,
        authList: userAuthList,
        menuId: props.menuId
    });

    return { editMode, defaultAttributeId }

}

export default useSettingDefault;
