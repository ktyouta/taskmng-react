import ENV from '../../env.json';

//NotFound画面遷移用のダミーID
export const DUMMY_ID = "ZZZ";
//タスクIDの接頭辞
export const PRE_TASK_ID = `TASKID-`;
//検索条件取得用のクエリキー
export const SEARCHCONDITION_QUERY_KEY = "?attribute=";
//デフォルト属性用の検索条件取得キー
export const SEARCHCONDITION_KEY_DEFAULT = "default";
//カスタム属性用の検索条件取得キー
export const SEARCHCONDITION_KEY_CUSTOM = "custom";
//ステータス
//未完了
export const NOCOMP_STATUS = "1";
//完了
export const COMP_STATUS = "2";
//保留
export const HOLD_STATUS = "3";
//対応中
export const WORKING_STATUS = "4";
//タスクリストの画面表示件数
export const TASK_DISPLAY_NUM = 25;
//メモリストの検索用URL
export const TASK_SEARCH_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.TASK}`;
//タスク画面ルートパス
export const TASK_ROOT_PATH = "/";
//コンテンツの背景色(期限切れ + 未対応)
export const NOCOMP_STATUS_BACKCOLOR = "#FFCCFF";
//コンテンツのボーダーカラー(期限切れ + 未対応)
export const NOCOMP_STATUS_BODERCOLOR = "#FF66FF";
//コンテンツの背景色(期限切れ + 保留)
export const HOLD_STATUS_BACKCOLOR = "#FFFF99";
//コンテンツのボーダーカラー(期限切れ + 保留)
export const HOLD_STATUS_BODERCOLOR = "#FFFF00";
//コンテンツの背景色(完了)
export const COMP_STATUS_BACKCOLOR = "#CCCCCC";
//コンテンツのボーダーカラー(完了)
export const COMP_STATUS_BODERCOLOR = "#808080";
//コンテンツの背景色(対応中)
export const WORKING_STATUS_BACKCOLOR = "#99FFFF";
//コンテンツのボーダーカラー(対応中)
export const WORKING_STATUS_BODERCOLOR = "#33FFFF";
//コンテンツの背景色(未対応)
export const DEFAULT_STATUS_BACKCOLOR = "#EEEEEE";
//コンテンツのボーダーカラー(未対応)
export const DEFAULT_STATUS_BODERCOLOR = "#c0c0c0";
//コンテンツの背景色(削除済み)
export const DELETE_BBACKCOLOR = "#a9a9a9";
//コンテンツのボーダーカラー(削除済み)
export const DELETE_BODERCOLOR = "#333333";
