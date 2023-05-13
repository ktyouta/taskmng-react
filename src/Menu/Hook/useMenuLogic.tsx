import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';


function useMenuLogic() {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);
    //メニュー名
    const [selectedMenu] = useGetViewName({ menu });

    return { menu, selectedMenu };
}

export default useMenuLogic;
