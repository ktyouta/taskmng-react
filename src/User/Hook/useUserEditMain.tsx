import { useAtomValue } from "jotai";
import useSwitch from "../../Common/Hook/useSwitch";
import { userInfoAuthorityAtom } from "../Atom/UserAtom";



function useUserEditMain() {

    //ユーザー画面の権限
    const userInfoAuthority = useAtomValue(userInfoAuthorityAtom);
    //権限設定モーダルの開閉用フラグ
    const {
        flag: isAuthModalOpen,
        onFlag: openAuthModal,
        offFlag: closeAuthModal, } = useSwitch();


    return {
        userInfoAuthority,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
    }

}

export default useUserEditMain;
