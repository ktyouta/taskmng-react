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
const retSettingComponent = (componentName: string, url: string) => {
    let component = <React.Fragment></React.Fragment>;
    switch (componentName) {
        case "SettingCustom":
            component = <SettingCustom
                url={url}
            />;
            break;
        case "SettingCategory":
            component = <SettingCategory
                url={url}
            />;
            break;
        case "SettingUser":
            component = <SettingUser
                url={url}
            />;
            break;
    }
    return component;
};


function useSettingMain() {

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
            const Component = retSettingComponent(element.component, element.path);
            if (!Component) {
                return;
            }

            //設定画面（/）にアクセスした際に、メニューの先頭の画面に遷移させる
            if (index === 0) {
                return (
                    <React.Fragment>
                        <Route key={element.path} path={element.componentPath} element={<Provider>{Component}</Provider>} />
                        <Route path="/" element={<Navigate to={element.path} />} />
                    </React.Fragment>
                );
            }
            return <Route key={element.path} path={element.componentPath} element={<Provider>{Component}</Provider>} />;
        }).filter(e => e);
        return tmpSettingRouteList;
    }, [settingMenu]);

    return { settingRouteList }
}
export default useSettingMain;
