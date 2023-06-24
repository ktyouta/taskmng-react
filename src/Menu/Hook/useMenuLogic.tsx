import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';


function useMenuLogic() {

    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);
    //メニュー名
    const [selectedMenu] = useGetViewName({ menu });
    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //画面に表示するメニュー
    const menuList = useMemo(() => {
        let tmpMenuList: JSX.Element[] = [];
        if (!menu || menu.length < 1) {
            return;
        }
        if (!userInfo) {
            return;
        }
        let cnt = 0;
        const userAuth = parseInt(userInfo.auth);
        tmpMenuList = menu.map((element, index) => {
            //ログインユーザーの権限でルーティングを切り替える
            if (parseInt(element.auth) > userAuth) {
                return <React.Fragment />;
            }
            //非表示メニュー
            if (element.isHidden) {
                return <React.Fragment />;
            }
            cnt++;
            let cssName = "";
            //先頭のli
            if (cnt === 1) {
                cssName = "top-menu-li ";
            }
            //選択中のメニューを強調
            if (element.name === selectedMenu) {
                cssName += "selected";
            }
            return (
                <li key={`${element.url}-${index}`} className={cssName}>
                    <Link to={element.url} className="menu-link">{element.name}</Link>
                </li>
            )
        });

        return tmpMenuList;
    }, [menu, selectedMenu, userInfo]);

    return { menu, selectedMenu, menuList };
}

export default useMenuLogic;
