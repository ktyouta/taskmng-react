import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import Top from '../../Top/Top';
import Master from '../../Master/Master';
import Setting from '../../Setting/Setting';
import { masterDataListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { menuListType } from '../../Common/Hook/useGetViewName';
import { Route } from "react-router-dom";
import NotFoundComponent from '../../NotFound/NotFoundComponent';
import useQueryClientWapper from '../../Common/Hook/useQueryClientWapper';
import { Provider, atom, useAtom, useAtomValue } from 'jotai';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import useQueryAtomValue from '../../Common/Hook/useQueryAtomValue';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import AddMaster from '../../AddMaster/AddMaster';


type jsxObjType = {
    [key: string]: JSX.Element
}

const jsxList: jsxObjType = {
    "Top": <Top />,
    "Master": <Master />,
    "AddMaster": <AddMaster />,
    "Setting": <Setting />
}

//マスタのリスト(マスタメンテ画面のコンボ用)
export const masterDataListAtom = atom<masterDataListType[]>([]);

/**
 * 取得したデータからマスタのリスト(マスタメンテ画面のコンボ用)を作成
 * @param data 
 * @returns 
 */
function createMasterDataListInfo(data: { mastertable: masterDataListType[] }): masterDataListType[] {
    return data.mastertable;
}


function useMainLogic() {

    //マスタのリスト(マスタメンテ画面のコンボ用)を取得
    useQueryWrapper(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MASTERTABLE}`,
            callback: createMasterDataListInfo,
            //取得データをAtomに保存
            afSuccessFn: (data) => {
                setMasterDataList(data);
            }
        }
    );
    const [masterDataList, setMasterDataList] = useGlobalAtom(masterDataListAtom);

    //ユーザー情報
    const userInfo = useGlobalAtomValue(userInfoAtom);
    //クライアント用メニューリスト
    const menu = useGlobalAtomValue(clientMenuListAtom);

    //useQueryAtomValueを使用した取得法
    //const {clientData:userInfo} = useQueryAtomValue<userInfoType | undefined>(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.AUTH}`);


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
            return <Route key={path} path={path} element={<Provider>{Component}</Provider>} />
        });

        //notfoundページ
        tmpComponentList.push(<Route key={"*"} path="*" element={<NotFoundComponent />} />);
        return tmpComponentList;
    }, [menu, userInfo]);

    return { masterDataList, componentList }
}

export default useMainLogic;
