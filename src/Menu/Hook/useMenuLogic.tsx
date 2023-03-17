import { Link } from 'react-router-dom';
import ENV from '../../env.json';
import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';


function useMenuLogic() {

    //キャッシュからメニューを取得
    const menu = useQueryClientWapper<menuListType[]>(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`);
    //メニュー名
    const [selectedMenu] = useGetViewName({ menu });

    return {menu,selectedMenu};
}

export default useMenuLogic;
