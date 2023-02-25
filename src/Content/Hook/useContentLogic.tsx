import React, { useContext, useEffect, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import { menuListType } from '../../Common/Hook/useGetViewName';

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string
};

function useContentLogic() {

    //サイドメニューリスト
    const [sideMenu, setSideMenu] = useState<menuListType[]>([]);

    //認証チェック
    const { userInfo } = useCheckAuth();
    //メニューのリスト
    const menuList: menuListType[] = useFetchJsonData(`${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`).menu;

    //メニューリストを作成
    useEffect(() => {
        if(!menuList || !userInfo){
            return;
        }
        let tmpMenuList = [...menuList].filter((element:menuListType)=>{
            //ユーザーの権限によりメニューの表示を制限する
            return parseInt(userInfo.auth) >= parseInt(element.auth);
        });
        setSideMenu(tmpMenuList);
    }, [menuList,userInfo]);

    return { sideMenu, userInfo }
}

export default useContentLogic;
