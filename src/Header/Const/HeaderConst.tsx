import ENV from '../../env.json';

//ログイン画面のパス
export const LOGIN_PATH = "/login";
//ユーザーメニュー画面のパス
export const USER_PATH = "/user";
//ホーム画面のパス
export const HOME_PATH = "/";
//ローカルストレージに保存するキー（現在のパス）
export const NOWPATH_STRAGEKEY = "nowPath";
//作業履歴の取得間隔
export const GET_WORKHISTORY_INTERVAL = 30000;
//ヘッダーの作業履歴取得キー(ReactQuery用)
export const REACTQUERY_GETWORKHISTORY_KEY = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}-headerkey`