import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import Top from '../../Top/Top';
import Master from '../../Master/Master';
import Setting from '../../Setting/Setting';
import { generalDataType, jsxObjType, masterDataListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { menuListType } from '../../Common/Hook/useGetViewName';
import { Route } from "react-router-dom";
import NotFoundComponent from '../../NotFound/NotFoundComponent';
import { Provider, atom, useAtom, useAtomValue } from 'jotai';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import useQueryAtomValue from '../../Common/Hook/useQueryAtomValue';
import { useGlobalAtom, useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import AddMaster from '../../AddMaster/AddMaster';
import Task from '../../Task/Task';
import { searchConditionType } from '../../Task/Type/TaskType';
import Home from '../../Home/Home';


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

    //汎用詳細を取得
    useQueryWrapper<generalDataType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
        }
    );

    //検索条件リストを取得
    useQueryWrapper<searchConditionType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SEARCHCONDITION}`,
        }
    );

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
            let Component;
            const path = element.componentPath;
            if (element.isHidden) {
                return <React.Fragment />;
            }

            //ルーティングの設定
            switch (element.component) {
                case "Home":
                    Component = <Home />;
                    break;
                case "Top":
                    Component = <Top />;
                    break;
                case "Master":
                    Component = <Master />;
                    break;
                case "AddMaster":
                    Component = <AddMaster />;
                    break;
                case "Task":
                    Component = <Task
                        url={element.url}
                    />;
                    break;
                case "Setting":
                    Component = <Setting />;
                    break;
            }
            return <Route key={path} path={path} element={<Provider>{Component}</Provider>} />
        });

        //notfoundページ
        tmpComponentList.push(<Route key={"*"} path="*" element={<NotFoundComponent backUrl='/' />} />);
        return tmpComponentList;
    }, [menu, userInfo]);

    return { masterDataList, componentList }
}

export default useMainLogic;
