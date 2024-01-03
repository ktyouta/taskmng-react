import { useCookies } from 'react-cookie';
import ENV from './env.json';
import useQueryWrapper, { errResType } from './Common/Hook/useQueryWrapper';
import { menuListType } from './Common/Type/CommonType';
import { useMemo } from 'react';
import { categoryType } from './Setting/SettingCategory/Type/SettingCategoryType';


function useQueryApp() {

    //認証クッキー
    const [cookies] = useCookies();

    return {
        cookies,
    }
}

export default useQueryApp;