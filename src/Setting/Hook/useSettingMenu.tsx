import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import ENV from '../../env.json';
import useGetSettingViewName from './useGetSettingViewName';
import { menuListType } from '../../Common/Type/CommonType';


//引数の型
type propsType = {
    path: string,
}

function useSettingMenu(props: propsType) {

    //メニューのリスト
    const { data: settingMenu } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGMENU}`,
        }
    );

    //メニュー名
    const [selectedMenu] = useGetSettingViewName({
        menu: settingMenu,
        path: props.path
    });

    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);

    //画面に表示するメニュー
    const menuList = useMemo(() => {
        let tmpMenuList: JSX.Element[] = [];
        if (!settingMenu || settingMenu.length < 1) {
            return;
        }
        if (!userInfo) {
            return;
        }
        let cnt = 0;
        const userAuth = parseInt(userInfo.auth);
        tmpMenuList = settingMenu.map((element, index) => {
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
            let path = `${props.path}${element.path}`
            //先頭のli
            if (cnt === 1) {
                cssName = "top-menu-li ";
            }
            //選択中のメニューを強調
            if (element.name === selectedMenu) {
                cssName += "selected";
            }
            return (
                <li key={`${path}-${index}`} className={cssName}>
                    <Link to={path} className="menu-link">{element.name}</Link>
                </li>
            )
        });

        return tmpMenuList;
    }, [settingMenu, selectedMenu, userInfo]);

    return {
        settingMenu,
        selectedMenu,
        menuList
    };
}

export default useSettingMenu;
