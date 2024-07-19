import ENV from '../../../env.json';

//権限ID
export const AUTH_ID = "1";
//管理者ID
export const ADMIN_ID = "3";
//アイコンタイプの選択値
export const SELECT_ICON_TYPE = {
    NO_SELECT: "1",
    STANDARD: "2",
    ORIGINAL: "3",
}
//アイコンリスト取得用URL
export const ICON_LIST_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.IMAGELIST}`;