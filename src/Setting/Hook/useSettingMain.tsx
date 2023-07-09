import useGetViewName, { menuListType } from '../../Common/Hook/useGetViewName';
import { clientMenuListAtom, userInfoAtom } from '../../Content/Hook/useContentLogic';
import { useGlobalAtomValue } from '../../Common/Hook/useGlobalAtom';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import useQueryWrapper from '../../Common/Hook/useQueryWrapper';
import ENV from '../../env.json';


function useSettingMain() {

    //メニューのリスト
    const { data: settingMenu } = useQueryWrapper<menuListType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.SETTINGMENU}`,
        }
    );

    return { settingMenu }

}

export default useSettingMain;
