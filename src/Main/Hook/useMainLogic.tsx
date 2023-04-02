import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import Top from '../../Top/Top';
import Master from '../../Master/Master';
import Setting from '../../Setting/Setting';
import { resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { menuListType } from '../../Common/Hook/useGetViewName';
import { Route } from "react-router-dom";
import NotFoundComponent from '../../NotFound/NotFoundComponent';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';
import { atom, useAtom, useAtomValue } from 'jotai';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import useQueryAtomValue from '../../Common/Hook/useQueryAtomValue';

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string
};

export const masterDataListContext = React.createContext({} as {
    masterDataList: masterDataListType[]
});

type jsxObjType = {
    [key: string]: JSX.Element
}

const jsxList: jsxObjType = {
    "Top": <Top />,
    "Master": <Master />,
    "Setting": <Setting />
}

//マスタのリスト(マスタメンテ画面のコンボ用)
export const masterDataListAtom = atom<masterDataListType[]>([]);


function useMainLogic() {

    //マスタのリスト(マスタメンテ画面のコンボ用)
    const masterDataListInfo: masterDataListType[] = useFetchJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMASTERTABLE}`).mastertable;
    const [masterDataList,setMasterDataList] = useAtom(masterDataListAtom);

    //ユーザー情報
    const userInfo = useAtomValue(userInfoAtom);
    //クライアント用メニューリスト
    const menu = useAtomValue(clientMenuListAtom);

    //useQueryAtomValueを使用した取得法
    //const {data:userInfo} = useQueryAtomValue<userInfoType | undefined>(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`);

    //取得データをAtomに保存
    useEffect(()=>{
        if(!masterDataListInfo){
            return;
        }
        setMasterDataList(masterDataListInfo);
    },[masterDataListInfo]);

    //Mainコンポーネントのルーティングリスト
    const componentList = useMemo(() => {
        let tmpComponentList: JSX.Element[] = [];
        if (!menu || menu.length < 1) {
            return;
        }
        if (!userInfo) {
            return;
        }
        const userAuth = parseInt(userInfo.auth);
        tmpComponentList = menu.map((element) => {
            //ログインユーザーの権限でルーティングを切り替える
            if (parseInt(element.auth) > userAuth) {
                return <React.Fragment />;
            }
            const Component = jsxList[element.component];
            const path = element.componentPath;
            return <Route key={path} path={path} element={Component} />
        });

        //notfoundページ
        tmpComponentList.push(<Route key={"*"} path="*" element={<NotFoundComponent />} />);
        return tmpComponentList;
    }, [menu, userInfo]);

    return { masterDataList, componentList }
}

export default useMainLogic;
