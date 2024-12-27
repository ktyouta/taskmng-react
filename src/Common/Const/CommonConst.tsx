//閲覧モード
export const VIEW_MODE = {
    view: 1,
    edit: 2,
}
//ユーザー権限
export const USER_AUTH = {
    PUBLIC: "1",
    MASTER: "2",
    ADMIN: "3",
}
//ローカルストレージに保存するキー（ユーザーID）
export const USERID_STRAGEKEY = "userId";
//z-index設定用
export const Z_INDEX_PARAM = {
    WAITLOADING: 1000,
    HEADOVERLAY: 2000,
    HEADNAV: 2001,
}
//フラグ
export const FLG = {
    OFF: "0",
    ON: "1",
}
//汎用詳細のキー
export const GEN_KEY = {
    BREADCRUMB: "9",
}

//画面ID
export const CATEGORY_ID = {
    HOME: "CATEGORY-1",
    MASTER_EDIT: "CATEGORY-3",
    ADD_MASTER: "CATEGORY-4",
    TASK: "CATEGORY-5",
    MEMO: "CATEGORY-6",
    SETTING: "CATEGORY-7",
    USER: "CATEGORY-8",
    HISTORY: "CATEGORY-9",
    DEFAULTATTRIBUTE: "SUBCATEGORY-1",
    CUSTOMATTRIBUTE: "SUBCATEGORY-2",
    SEARCHCONDITON: "SUBCATEGORY-3",
    SETTINGCATEGORY: "SUBCATEGORY-4",
    SETTING_USER: "SUBCATEGORY-5",
}