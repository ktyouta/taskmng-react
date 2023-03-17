import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import useChangeUrlFunction from './useChangeUrlFunction';

export type menuListType = {
    name:string,
    url:string,
    component:string,
    componentPath:string,
    auth:string,
}

type propsType = {
    menu: menuListType[] | undefined,
}

/**
 * URLが変化した際に画面名(大機能)を返却
 * @param url 
 * @returns 
 */
function useGetViewName(props: propsType) {

    //メニュー名
    const [selectedMenu, setSelectedMenu] = useState("");

    //メニューの変更
    const changeSelectedMenu = () => {
        if (props.menu && props.menu.length > 0) {
            props.menu.forEach((element) => {
                //urlが一致する場合にヘッダタイトルを変更
                if (element.url === window.location.pathname) {
                    setSelectedMenu(element.name);
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

export default useGetViewName;