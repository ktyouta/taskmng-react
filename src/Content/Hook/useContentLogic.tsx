import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import { menuListType } from '../../Common/Hook/useGetViewName';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string
};

function useContentLogic() {

    //認証チェック
    const { userInfo } = useCheckAuth();
    //メニューのリスト
    const { data: menuList } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`,
        }
    );

    //メニューリストを作成
    const sideMenu = useMemo(() => {
        if (!menuList || !userInfo) {
            return [];
        }
        let tmpMenuList = [...menuList].filter((element: menuListType) => {
            //ユーザーの権限によりメニューの表示を制限する
            return parseInt(userInfo.auth) >= parseInt(element.auth);
        });
        //setSideMenu(tmpMenuList);
        return tmpMenuList;
    }, [menuList, userInfo]);

    return { sideMenu, userInfo }
}

export default useContentLogic;
