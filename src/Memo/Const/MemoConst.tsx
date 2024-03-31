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
    draft: "1",
    regist: "2",
}