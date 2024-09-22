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
export const REACTQUERY_GETWORKHISTORY_KEY = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASKHISTORY}-headerkey`;
//未読通知件数のローカルストレージ用キー(未読件数-データ件数)
export const UNREAD_NUM_KEY = "UNREAD_NUM_KEY";
//未読通知件数のローカルストレージ用ハイフン
export const UNREAD_NUM_CONNECT = "-";
//削除フラグ
export const DELETE_ON = "1";