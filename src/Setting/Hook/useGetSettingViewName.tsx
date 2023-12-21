import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import useChangeUrlFunction from '../../Common/Hook/useChangeUrlFunction';
import { menuListType } from '../../Common/Type/CommonType';


type propsType = {
    menu: menuListType[] | undefined,
}

/**
 * URLが変化した際に画面名(大機能)を返却
 * @param url 
 * @returns 
 */
function useGetSettingViewName(props: propsType) {

    //メニュー名
    const [selectedMenu, setSelectedMenu] = useState("");

    //メニューの変更
    const changeSelectedMenu = () => {
        if (props.menu && props.menu.length > 0) {
            let pathArray = window.location.pathname.split("/");
            if (pathArray.length < 2) {
                return;
            }
            //小機能部分を取得
            let mainPath = `/${pathArray[1]}/${pathArray[2]}`;
            props.menu.forEach((element) => {
                //urlが一致する場合にヘッダタイトルを変更
                if (element.path === mainPath) {
                    setSelectedMenu(element.name);
                    return;
                }
            })
        }
    }

    //urlが変更した際にメニュー名を変更
    useChangeUrlFunction(changeSelectedMenu);

    //初回読み込み時にメニュー名を取得
    useEffect(() => {
        changeSelectedMenu();
    }, [props.menu]);

    return (
        [selectedMenu]
    );
}

export default useGetSettingViewName;