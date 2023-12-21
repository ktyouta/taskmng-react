import React, { useContext, useEffect, useMemo, useState } from 'react';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { atom, useAtom } from 'jotai';
import { menuListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { useGlobalAtom } from '../../Common/Hook/useGlobalAtom';


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
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MENU}`,
        }
    );

    // ユーザー情報
    const [userInfo, setUserInfoAtom] = useGlobalAtom(userInfoAtom);
    //クライアント用メニューリスト
    const [clientMenuList, setClientMenuList] = useGlobalAtom(clientMenuListAtom);

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
        setClientMenuList(tmpMenuList);
    }, [menuList, userInfo]);

    return { clientMenuList, userInfo }
}

export default useContentLogic;
