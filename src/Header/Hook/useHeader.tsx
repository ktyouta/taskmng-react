import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { menuType } from '../../Common/Type/CommonType';
import { useAtomValue } from 'jotai';
import { clientMenuListAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';


function useHeader() {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);

    //ヘッダタイトル
    const [headerTile] = useGetViewName({ menu });
    //認証クッキー
    const [cookie, , removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();

    /**
     * ログアウト
     */
    function logout() {
        Object.keys(cookie).forEach((key) => {
            removeCookie(key, { path: '/' });
        });
        navigate(`/login`);
    }

    return { headerTile, logout };
}

export default useHeader;
