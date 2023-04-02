import React, { useContext, useEffect, useMemo, useState } from 'react';
import useFetchJsonData from '../../Common/Hook/useFetchJsonData';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import { menuListType } from '../../Common/Hook/useGetViewName';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { atom, useAtom } from 'jotai';
import { resUserInfoType, userInfoType } from '../../Common/Type/CommonType';

//マスタのリスト
export type masterDataListType = {
    value: string,
    label: string,
    remarks: string
};

//ユーザー情報ATOM
export const userInfoAtom = atom<userInfoType | undefined>(undefined);
//メニューATOM
export const clientMenuListAtom = atom<menuListType[]>([]);

function useContentLogic() {

    //認証チェック
    const { info } = useCheckAuth();
    //メニューのリスト
    const { data: menuList } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GETMENU}`,
        }
    );

    // ユーザー情報
    const [userInfo, setUserInfoAtom] = useAtom(userInfoAtom);
    //クライアント用メニューリスト
    const [clientMenuList, setClientMenuList] = useAtom(clientMenuListAtom);

    //ユーザー情報をセット
    useEffect(() => {
        if (!info) {
            return;
        }
        setUserInfoAtom(info);
    }, [info]);

    //メニューリストを作成
    useEffect(() => {
        if (!menuList || !userInfo) {
            return;
        }
        let tmpMenuList = [...menuList].filter((element: menuListType) => {
            //ユーザーの権限によりメニューの表示を制限する
            return parseInt(userInfo.auth) >= parseInt(element.auth);
        });
        //setSideMenu(tmpMenuList);
        setClientMenuList(tmpMenuList);
    }, [menuList, userInfo]);

    return { clientMenuList, userInfo }
}

export default useContentLogic;
