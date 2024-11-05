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

        let menuObj = props.menu.find((element) => {
            return element.path === mainPath;
        });

        //URLが大機能に一致しない
        if (!menuObj) {
            return;
        }

        //サブメニューを保持していない
        if (!menuObj.subCategoryList ||
            menuObj.subCategoryList.length === 0
        ) {
            setSelectedMenu(menuObj.name);
            setSelectedMenuId(menuObj.id);
            return;
        }

        //サブメニューを保持している場合は再帰的に確認する
        getSubMenuInfo(
            menuObj.subCategoryList,
            pathArray,
            2,
            setSelectedMenu,
            setSelectedMenuId
        );
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


/**
 * 選択したメニューを再帰的に確認
 * @param subCategoryList サブカテゴリリスト
 * @param pathArray パスリスト
 * @param index インデックス
 * @param setSelectedMenu メニュー名称のセッター
 * @param setSelectedMenuId メニューIDのセッター
 * @returns 
 */
function getSubMenuInfo(
    subCategoryList: menuListType[],
    pathArray: string[],
    index: number,
    setSelectedMenu: (value: React.SetStateAction<string>) => void,
    setSelectedMenuId: (value: React.SetStateAction<string>) => void,
) {

    let tmpSubCategoryList: menuListType[] = [];

    if (pathArray.length < index + 1) {
        return;
    }

    //サブメニューパス
    let subPath = `/${pathArray[index]}`;

    subCategoryList.some((element) => {

        if (element.path === subPath) {

            //サブメニューを保持していない場合は、名称とタイトルを保存
            if (!element.subCategoryList ||
                element.subCategoryList.length === 0
            ) {
                setSelectedMenu(element.name);
                setSelectedMenuId(element.id);
                return;
            }

            tmpSubCategoryList = element.subCategoryList;

            return true;
        }
    });

    index++;

    //サブメニューが存在する場合は下の階層を確認
    if (tmpSubCategoryList.length > 0) {
        getSubMenuInfo(
            tmpSubCategoryList,
            pathArray,
            index,
            setSelectedMenu,
            setSelectedMenuId,
        );
    }

    return;
}

export default useGetViewName;