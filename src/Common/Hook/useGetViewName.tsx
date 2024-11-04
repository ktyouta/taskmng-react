import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import useChangeUrlFunction from './useChangeUrlFunction';
import { menuListType } from '../Type/CommonType';
import { HeaderTestIdPrefix } from '../../tests/AppTest/DataTestId';

//引数の型
type propsType = {
    menu: menuListType[] | undefined,
}

//戻り値の型
type retType = string[]

/**
 * URLが変化した際に画面名(大機能)を返却
 * @param url 
 * @returns 
 */
function useGetViewName(props: propsType): retType {

    //メニュー名
    const [selectedMenu, setSelectedMenu] = useState("");
    //メニューID(vitest用)
    const [selectedMenuId, setSelectedMenuId] = useState("");

    //メニューの変更
    const changeSelectedMenu = () => {

        //メインメニューが存在しない
        if (!props.menu || props.menu.length === 0) {
            return;
        }

        let pathArray = window.location.pathname.split("/");

        if (pathArray.length < 2) {
            return;
        }

        //大機能部分を取得
        let mainPath = `/${pathArray[1]}`;

        props.menu.some((element) => {

            //urlが一致する場合にヘッダタイトルを変更
            if (element.path === mainPath) {

                //選択したメニューがサブメニューを保持している場合
                if (element.subCategoryList &&
                    element.subCategoryList.length > 0 &&
                    pathArray.length > 2) {

                    //サブメニューのURL
                    let subPath = `/${pathArray[1]}/${pathArray[2]}`;

                    element.subCategoryList.some((element1) => {

                        let tmpPath = `${element.path}${element1.path}`;

                        if (tmpPath === subPath) {
                            setSelectedMenu(element1.name);
                            setSelectedMenuId(element1.id);
                            return true;
                        }
                    })
                }
                else {
                    setSelectedMenu(element.name);
                    setSelectedMenuId(element.id);
                }

                return true;
            }
        });


    }

    //urlが変更した際にメニュー名を変更
    useChangeUrlFunction(changeSelectedMenu);

    //初回読み込み時にメニュー名を取得
    useEffect(() => {
        changeSelectedMenu();
    }, [props.menu]);

    return (
        [
            selectedMenu,
            selectedMenuId,
        ]
    );
}

export default useGetViewName;