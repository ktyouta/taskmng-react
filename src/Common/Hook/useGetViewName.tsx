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

        //パス確認用の初期インデックス
        const PATH_INDEX_INIT = 1;

        //メインメニューが存在しない
        if (!props.menu || props.menu.length === 0) {
            return;
        }

        let pathArray = window.location.pathname.split("/");

        //URLからメニューの名称とIDを取得する
        getSubMenuInfo(
            props.menu,
            pathArray,
            PATH_INDEX_INIT,
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
 * @param pathIndex インデックス
 * @param setSelectedMenu メニュー名称のセッター
 * @param setSelectedMenuId メニューIDのセッター
 * @returns 
 */
function getSubMenuInfo(
    subCategoryList: menuListType[],
    pathArray: string[],
    pathIndex: number,
    setSelectedMenu: (value: React.SetStateAction<string>) => void,
    setSelectedMenuId: (value: React.SetStateAction<string>) => void,
) {

    let tmpSubCategoryList: menuListType[] = [];

    if (pathArray.length < pathIndex + 1) {
        return;
    }

    //サブメニューパス
    let subPath = `/${pathArray[pathIndex]}`;

    //メニューリストからパスに一致する要素を取得
    let menuObj = subCategoryList.find((element) => {
        return element.path === subPath;
    });

    //パスに一致するカテゴリが存在しない
    if (!menuObj) {
        return;
    }

    //サブメニューを保持していない場合は名称とIDを保存
    if (!menuObj.subCategoryList ||
        menuObj.subCategoryList.length === 0
    ) {
        setSelectedMenu(menuObj.name);
        setSelectedMenuId(menuObj.id);
        return;
    }

    tmpSubCategoryList = menuObj.subCategoryList;

    //サブメニューが存在する場合は下の階層を確認
    if (tmpSubCategoryList.length > 0) {
        getSubMenuInfo(
            tmpSubCategoryList,
            pathArray,
            ++pathIndex,
            setSelectedMenu,
            setSelectedMenuId,
        );
    }

    return;
}

export default useGetViewName;