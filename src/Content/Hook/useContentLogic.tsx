import React, { useContext, useEffect, useMemo, useState } from 'react';
import ENV from '../../env.json';
import useCheckAuth from '../../Common/Hook/useCheckAuth';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import { atom, useAtom } from 'jotai';
import { menuListType, resUserInfoType, userInfoType } from '../../Common/Type/CommonType';
import { useGlobalAtom } from '../../Common/Hook/useGlobalAtom';
import useGetViewName from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../Atom/ContentAtom';
import useGetGeneralDataList from '../../Common/Hook/useGetGeneralDataList';
import { GEN_KEY } from '../../Common/Const/CommonConst';
import useGetBreadcrumbList from '../../Common/Hook/useGetBreadcrumbList';



function useContentLogic() {

    //認証チェック
    const { info } = useCheckAuth();
    //メニューの開閉フラグ
    const [isOpenMenu, setIsOpenMenu] = useState(true);
    // ユーザー情報
    const [userInfo, setUserInfoAtom] = useGlobalAtom(userInfoAtom);
    //クライアント用メニューリスト
    const [clientMenuList, setClientMenuList] = useGlobalAtom(clientMenuListAtom);
    //ヘッダタイトル
    const [headerTitle, headerId] = useGetViewName({ menu: clientMenuList });

    //メニューのリスト
    const { data: menuList } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.CATEGORY}`,
        }
    );

    //汎用詳細リスト(パンくずリスト)
    const { generalDataList: breadcrumbGenList } = useGetGeneralDataList(GEN_KEY.BREADCRUMB);

    //パンくずリスト
    const breadcrumbList = useGetBreadcrumbList({
        menu: menuList,
        breadcrumbGenList
    });

    /**
     * メニューの開閉
     */
    function switchMenu() {
        setIsOpenMenu(!isOpenMenu);
    }

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
        setClientMenuList(menuList);
    }, [menuList, userInfo]);

    return {
        clientMenuList,
        userInfo,
        headerTitle,
        headerId,
        isOpenMenu,
        switchMenu,
        breadcrumbList,
    }
}

export default useContentLogic;
