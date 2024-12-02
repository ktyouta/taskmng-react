import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { editModeAtom, settingUserAuthorityAtom, userIdAtom } from "../Atom/SettingUserAtom";
import { useGlobalAtomValue } from "../../../Common/Hook/useGlobalAtom";
import { userAuthListAtom } from "../../../Content/Atom/ContentAtom";
import useSetMenuAuthEffect from "../../../Common/Hook/useSetMenuAuthEffect";


//引数の型
type propsType = {
    menuId: string,
}


function useSettingUser(props: propsType) {

    //権限リスト
    const userAuthList = useGlobalAtomValue(userAuthListAtom);
    //ユーザー画面の権限
    const setSettingUserAuthority = useSetAtom(settingUserAuthorityAtom);


    //カスタム属性画面の権限をセットする
    useSetMenuAuthEffect({
        setter: setSettingUserAuthority,
        authList: userAuthList,
        menuId: props.menuId
    });

}

export default useSettingUser;
