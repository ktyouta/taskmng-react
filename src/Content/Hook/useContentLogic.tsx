import React, { useContext, useEffect, useMemo, useState } from 'react';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { atom, useAtom } from 'jotai';
import { menuListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { useGlobalAtom } from '../../Common/Hook/useGlobalAtom';
import useGetViewName from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../Atom/ContentAtom';



function useContentLogic() {

    //認証チェック
    const { info } = useCheckAuth();
    //メニューのリスト
    const { data: menuList } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
        }
    );

    // ユーザー情報
    const [userInfo, setUserInfoAtom] = useGlobalAtom(userInfoAtom);
    //クライアント用メニューリスト
    const [clientMenuList, setClientMenuList] = useGlobalAtom(clientMenuListAtom);
    //ヘッダタイトル
    const [headerTitle, headerId] = useGetViewName({ menu: clientMenuList });

    //ユーザー情報をセット
    useEffect(() => {
        if (!info) {
            return;
        }
        setUserInfoAtom(info);
    }, [info]);

    //メニューリストを作成
    useEffect(() => {
        if (!menuList) {
            return;
        }
        if (!userInfo) {
            return;
        }
        let tmpMenuList = [...menuList].filter((element: menuListType) => {
            //ユーザーの権限によりメニューの表示を制限する
            return parseInt(userInfo.auth) >= parseInt(element.auth);
        });
        setClientMenuList(tmpMenuList);
    }, [menuList, userInfo]);

    return {
        clientMenuList,
        userInfo,
        headerTitle,
        headerId,
    }
}

export default useContentLogic;
