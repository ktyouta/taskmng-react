import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import Top from '../../Top/Top';
import Master from '../../Master/Master';
import Setting from '../../Setting/Setting';
import { resUserInfoType } from '../../Common/Type/CommonType';
import { menuListType } from '../../Common/Hook/useGetViewName';
import { Route } from "react-router-dom";
import NotFoundComponent from '../../NotFound/NotFoundComponent';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string
};

//引数の型
type propsType = {
    userInfo: resUserInfoType | undefined,
}

export const masterDataListContext = React.createContext({} as {
    masterDataList: masterDataListType[]
});

type jsxObjType = {
    [key: string]: JSX.Element
}

function useMainLogic(props: propsType) {

    const jsxList: jsxObjType = {
        "Top": <Top />,
        "Master": <Master />,
        "Setting": <Setting />
    }

    //キャッシュからメニューを取得
    const menu = useQueryClientWapper<menuListType[]>(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`);
    //マスタのリスト(マスタメンテ画面のコンボ用)
    const masterDataList: masterDataListType[] = useFetchJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMASTERTABLE}`).mastertable;

    //Mainコンポーネントのルーティングリスト
    const componentList = useMemo(() => {
        let tmpComponentList: JSX.Element[] = [];
        if (!menu || menu.length < 1) {
            return;
        }
        if (!props.userInfo) {
            return;
        }
        const userAuth = parseInt(props.userInfo.auth);
        tmpComponentList = menu.map((element) => {
            //ログインユーザーの権限でルーティングを切り替える
            if (parseInt(element.auth) > userAuth) {
                return <></>;
            }
            const Component = jsxList[element.component];
            const path = element.componentPath;
            return <Route key={path} path={path} element={Component} />
        });

        //notfoundページ
        tmpComponentList.push(<Route key={"*"} path="*" element={<NotFoundComponent />} />);
        return tmpComponentList;
    }, [menu, props.userInfo]);

    return { masterDataList, componentList }
}

export default useMainLogic;
