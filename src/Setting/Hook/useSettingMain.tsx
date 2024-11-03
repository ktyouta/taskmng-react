import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import ENV from '../../env.json';
import { Routes, Route, Navigate } from "react-router-dom";
import { JsxElement } from 'typescript';
import { jsxObjType, menuListType } from '../../Common/Type/CommonType';
import SettingCustom from '../SettingCustom/SettingCustom';
import SettingCategory from '../SettingCategory/SettingCategory';
import SettingUser from '../SettingUser/SettingUser';
import { Provider } from 'jotai';
import SettingDefault from '../SettingDefault/SettingDefault';
import SettingSearchCondition from '../SettingSearchCondition/SettingSearchCondition';


/**
 * 設定から該当のコンポーネントを返す
 * @param componentName 
 * @param url 
 * @returns 
 */
const retSettingComponent = (componentName: string, path: string) => {
    let component = <React.Fragment />;
    switch (componentName) {
        case "SettingCustom":
            component = <SettingCustom
                path={path}
            />;
            break;
        case "SettingCategory":
            component = <SettingCategory
                path={path}
            />;
            break;
        case "SettingUser":
            component = <SettingUser
                path={path}
            />;
            break;
        case "SettingDefault":
            component = <SettingDefault
                path={path}
            />;
            break;
        case "SettingSearchCondition":
            component = <SettingSearchCondition
                path={path}
            />;
            break;
    }
    return component;
};

//引数の型
type propsType = {
    path: string,
    subMenuList: menuListType[],
}

function useSettingMain(props: propsType) {

    //設定のルーティングリスト
    const settingRouteList = useMemo(() => {

        if (!props.subMenuList) {
            return;
        }

        let tmpSettingRouteList = props.subMenuList.map((element, index) => {

            //コンポーネントを取得
            let path = `${props.path}${element.path}`
            let Component = retSettingComponent(element.componentName, path);
            let componentPath = `${element.path}/*`;

            if (!Component) {
                return;
            }

            //設定画面（/）にアクセスした際に、メニューの先頭の画面に遷移させる
            if (index === 0) {
                return (
                    <React.Fragment>
                        <Route key={path} path={componentPath} element={<Provider>{Component}</Provider>} />
                        <Route path="/" element={<Navigate to={path} />} />
                    </React.Fragment>
                );
            }

            return <Route key={path} path={componentPath} element={<Provider>{Component}</Provider>} />;

        }).filter(e => e);

        return tmpSettingRouteList;

    }, [props.subMenuList]);

    return { settingRouteList }
}
export default useSettingMain;
