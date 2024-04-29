import ENV from '../../env.json';

//NotFound画面遷移用のダミーID
export const DUMMY_ID = "ZZZ";
//メモIDの接頭辞
export const PRE_MEMO_ID = `MEMOID-`;
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
//メモ画面ルートパス
export const MEMO_ROOT_PATH = "/";
//メモ画面編集画面ルートパス
export const MEMO_EDIT_PATH = "edit"
//メモ表示モード
export const MEMO_VIEW_MODE = {
    markdownOnly: "1",
    textareaOnly: "2",
    multiView: "3",
}
//メモの状態
export const MEMO_STATUS = {
    //下書き
    draft: "1",
    //登録
    regist: "2",
}
//メモリストの画面表示件数
export const MEMO_DISPLAY_NUM = 25;
//タグの最大設定個数
export const TAG_MAX_SETTINGNUM = 5;
//メモリストの検索用URL
export const MEMO_SEARCH_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}`;
//メモの検索条件リストの取得用URL
export const MEMO_SEARCHCONDITION_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOSEARCHCONDITION}`;
//クエリストリングのキー（タグ）
export const TAG_QUERY_KEY = "tag"