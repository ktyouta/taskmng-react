import React, { useEffect, useState } from 'react';
import { JsxElement } from 'typescript';
import useChangeUrlFunction from './useChangeUrlFunction';
import { generalDataType, menuListType } from '../Type/CommonType';
import { HeaderTestIdPrefix } from '../../tests/AppTest/DataTestId';

//引数の型
type propsType = {
    menu: menuListType[] | undefined,
    breadcrumbGenList: generalDataType[] | undefined,
}

//パンくずリストの型
export type breadcrumbType = {
    path: string,
    name: string,
    menuObj?: menuListType,
}


/**
 * URLが変化した際にパンくずリストを返却
 * @param url 
 * @returns 
 */
function useGetBreadcrumbList(props: propsType): breadcrumbType[] {

    //パンくずリスト
    const [breadcrumbList, setBreadcrumbList] = useState<breadcrumbType[]>([]);

    //パンくずリストの作成
    const createBreadcrumbList = () => {

        //メインメニューが存在しない
        if (!props.menu || props.menu.length === 0) {
            return;
        }

        let pathName = window.location.pathname;

        //ホーム画面の場合はパンくずリストを表示しない
        if (pathName === "/") {
            setBreadcrumbList([]);
            return;
        }

        //パスのリスト
        let pathArray = window.location.pathname.split("/");
        let tmpBreadcrumbList: breadcrumbType[] = [];

        pathArray.some((element, index) => {

            let menuObj: menuListType | undefined;

            //先頭のパスはメインメニューリストを確認
            if (index === 0) {

                menuObj = props.menu?.find((e) => {
                    return e.path === `/${element}`;
                });

                //先頭のパスがメインメニューのリストに存在しない場合はパンくずリストを表示しない
                if (!menuObj) {
                    return true;
                }

                tmpBreadcrumbList = [...tmpBreadcrumbList, {
                    path: `${menuObj.path}`,
                    name: menuObj.name,
                    menuObj: menuObj,
                }];

                return;
            }

            menuObj = tmpBreadcrumbList[tmpBreadcrumbList.length - 1].menuObj;
            //パンくずのリンク押下時の遷移先パス
            let naviPath = `${tmpBreadcrumbList.slice(1).map(e => e.path).join()}/${element}`;

            //一階層上のパスがサブメニューを保持している場合
            if (menuObj && menuObj.subCategoryList && menuObj.subCategoryList.length > 0) {

                let subMenuList = menuObj.subCategoryList;
                let subMenuObj = subMenuList.find((e2) => {
                    return e2.path === `/${element}`;
                });

                //サブメニューリスト内にパスが存在する場合
                if (subMenuObj) {

                    tmpBreadcrumbList = [...tmpBreadcrumbList, {
                        path: naviPath,
                        name: subMenuObj.name,
                        menuObj: subMenuObj,
                    }];
                    return;
                }
            }
            else {
                menuObj = props.menu?.find((e) => {
                    return e.path === `/${element}`;
                });

                if (menuObj) {
                    tmpBreadcrumbList = [...tmpBreadcrumbList, {
                        path: `${menuObj.path}`,
                        name: menuObj.name,
                        menuObj: menuObj,
                    }];
                    return;
                }
            }

            //汎用詳細のパンくず作成用データから取得
            let genObj = props.breadcrumbGenList?.find((e) => {
                return e.value === element;
            });

            //汎用詳細リストのパンくずデータが取得できた場合
            if (genObj) {
                tmpBreadcrumbList = [...tmpBreadcrumbList, {
                    path: naviPath,
                    name: genObj.label,
                }];
                return;
            }

            //汎用詳細のパンくず作成用データにマッチするパスがない場合は、パンくずの名称のパスを表示する
            tmpBreadcrumbList = [...tmpBreadcrumbList, {
                path: naviPath,
                name: element,
            }];

        });

        setBreadcrumbList(tmpBreadcrumbList);
    }


    //urlが変更した際にパンくずリストを取得
    useChangeUrlFunction(createBreadcrumbList);

    //初回読み込み時にパンくずリストを取得
    useEffect(() => {
        createBreadcrumbList();
    }, [props.menu, props.breadcrumbGenList]);


    return breadcrumbList;
}

export default useGetBreadcrumbList;