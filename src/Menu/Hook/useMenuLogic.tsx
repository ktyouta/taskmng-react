import { Link } from 'react-router-dom';
import ENV from '../../env.json';
import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';
import { useAtomValue } from 'jotai';
import { clientMenuListAtom } from '../../Content/Hook/useContentLogic';


function useMenuLogic() {

    //クライアント用メニューリスト
    const menu = useAtomValue(clientMenuListAtom);
    //メニュー名
    const [selectedMenu] = useGetViewName({ menu });

    return { menu, selectedMenu };
}

export default useMenuLogic;
