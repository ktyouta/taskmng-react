import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import ENV from '../../env.json';
import { Routes, Route, Navigate } from "react-router-dom";
import { JsxElement } from 'typescript';
import { jsxObjType } from '../../Common/Type/CommonType';
import SettingCustom from '../SettingCustom/SettingCustom';
import SettingCategory from '../SettingCategory/SettingCategory';
import SettingUser from '../SettingUser/SettingUser';
import { Provider } from 'jotai';


const jsxList: jsxObjType = {
    "SettingCustom": <SettingCustom />,
    "SettingCategory": <SettingCategory />,
    "SettingUser": <SettingUser />,
}


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
            const Component = jsxList[element.component];
            if (!Component) {
                return;
            }
            if (index === 0) {
                return (
                    <React.Fragment>
                        <Route key={element.url} path={element.componentPath} element={<Provider>{Component}</Provider>} />
                        <Route path="/" element={<Navigate to={element.url} />} />
                    </React.Fragment>
                );
            }
            return <Route key={element.url} path={element.componentPath} element={<Provider>{Component}</Provider>} />;
        }).filter(e => e);
        return tmpSettingRouteList;
    }, [settingMenu]);

    return { settingRouteList }
}
export default useSettingMain;
