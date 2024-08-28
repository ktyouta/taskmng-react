import { useCookies } from 'react-cookie';
import ENV from './env.json';
import useQueryWrapper, { errResType } from './Common/Hook/useQueryWrapper';
import { menuListType } from './Common/Type/CommonType';
import { useEffect, useMemo } from 'react';
import { categoryType } from './Setting/SettingCategory/Type/SettingCategoryType';
import { APP_TITLE } from './Title';


function useQueryApp() {

    //認証クッキー
    const [cookies] = useCookies();

    //タイトルの設定
    useEffect(() => {
        document.title = APP_TITLE;
    }, []);

    return {
        cookies,
    }
}

export default useQueryApp;