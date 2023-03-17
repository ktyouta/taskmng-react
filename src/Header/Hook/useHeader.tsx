import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import ButtonComponent from '../../Common/ButtonComponent';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import ENV from '../../env.json';
import { menuType } from '../../Common/Type/CommonType';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';


function useHeader() {

    //キャッシュからメニューを取得
    const menu = useQueryClientWapper<menuListType[]>(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`);
    //ヘッダタイトル
    const [headerTile] = useGetViewName({ menu });
    //認証クッキー
    const [, , removeCookie] = useCookies();
    //ルーティング用
    const navigate = useNavigate();

    /**
     * ログアウト
     */
    function logout() {
        removeCookie(ENV.AUTHENTICATION.cookie);
        navigate(`/login`);
    }

    return { headerTile, logout };
}

export default useHeader;
