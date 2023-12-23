import useGetViewName from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
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
    }
    return component;
};

//引数の型
type propsType = {
    path: string,
}

function useSettingMain(props: propsType) {

    //メニューのリスト
    const { data: settingMenu } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGMENU}`,
        }
    );

    //設定のルーティングリスト
    let settingRouteList = useMemo(() => {
        if (!settingMenu) {
            return;
        }
        let tmpSettingRouteList = settingMenu.map((element, index) => {
            //コンポーネントを取得
            let path = `${props.path}${element.path}`
            let Component = retSettingComponent(element.componentName, path);
            let componentPath = `${element.path}/*`
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
    }, [settingMenu]);

    return { settingRouteList }
}
export default useSettingMain;
