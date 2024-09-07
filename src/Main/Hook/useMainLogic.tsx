import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import Top from '../../Top/Top';
import Master from '../../Master/Master';
import Setting from '../../Setting/Setting';
import { generalDataType, jsxObjType, masterDataListType, menuListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { Route } from "react-router-dom";
import NotFoundComponent from '../../NotFound/NotFoundComponent';
import { Provider, atom, useAtom, useAtomValue } from 'jotai';
import useQueryAtomValue from '../../Common/Hook/useQueryAtomValue';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import AddMaster from '../../AddMaster/AddMaster';
import Task from '../../Task/Task';
import Home from '../../Home/Home';
import User from '../../User/User';
import Memo from '../../Memo/Memo';
import Histroy from '../../History/Histroy';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Atom/ContentAtom';
import { ScreenTestIdPrefix } from '../../tests/AppTest/DataTestId';
import { retComponent } from '../Function/MainFunction';


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

        //ユーザー権限
        let userAuth = parseInt(userInfo.auth);

        tmpComponentList = menu.reduce((current: JSX.Element[], element: menuListType) => {
            //ログインユーザーの権限でルーティングを切り替える
            if (parseInt(element.auth) > userAuth) {
                return current;
            }

            //ルーティングの設定
            let component = retComponent(element);

            if (!component) {
                return current;
            }

            //ルーティング用パス
            let componentPath = `${element.path}/*`;

            current.push(<Route key={componentPath} path={componentPath} element={<Provider>{component}</Provider>} />);
            return current;
        }, []);

        //notfoundページ
        tmpComponentList.push(<Route key={"*"} path="*" element={<NotFoundComponent backUrl='/' />} />);
        return tmpComponentList;
    }, [menu, userInfo]);

    return { masterDataList, componentList }
}

export default useMainLogic;
