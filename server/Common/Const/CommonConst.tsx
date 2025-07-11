import ENV from '../../../src/env.json';

//サーバーURL
export const SERVER_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.LOCALPORT}`;
//public
export const PUBLIC = `./public`;
//テスト用ファイルパス
export const TESTFILEPATH = `./public/json/master/test.json`;
//マスタファイルパス
export const MASTERFILEPATH = `./public/json/master/`;
//設定ファイルパス
export const SETTINGFILEPATH = `./public/json/setting/`;
//トランザクションファイルパス
export const TRANSACTION = `./public/json/transaction/`;
//JSON拡張子
export const JSONEXTENSION = `.json`;
//画像フォルダパス
export const IMAGE_FOLDER_PATH = `/img`;
//画像パス(スタンダード)
export const STANDARD_IMAGE_PATH = `/standard`;
//画像パス(オリジナル)
export const ORIGINAL_IMAGE_PATH = `/original`;

//マスタテーブルファイル名
export const MASTERTABLEFILENM = `samplemastertable`;
//汎用ファイル名
export const GENERALFILEPATH = `general`;
//汎用詳細ファイル名
export const GENERALDETAILFILEPATH = `generaldetail`;
//検索条件ファイル名
export const SEARCHCONDITIONFILEPATH = `searchcondition`;
//権限設定ファイル名
export const AUTHORIRY = `authority`;
//タスク検索条件ファイル名
export const TASK_PRIVATE_SEARCHCONDITION_FILEPATH = `taskprivatesearchcondition`;
//メモ検索条件ファイル名
export const MEMO_PRIVATE_SEARCHCONDITION_FILEPATH = `memoprivatesearchcondition`;


//タスクファイル名
export const TASKFILENM = `task`;
//カスタム属性
export const CUSTOMATTRIBUTE = `customattribute`;
//カスタム属性リスト
export const CUSTOMATTRIBUTELIST = `customattributeselectlist`;
//カスタム属性の選択値
export const CUSTOMATTRIBUTESELECT = "customattributetaskselectedvalue";

//タスクの作業履歴のファイル名
export const TASKHISTORYPATH = "taskhistory";

//ユーザー情報ファイル名
export const USERINFOFILEPATH = "userinfo";

//カテゴリデータファイル名
export const CATEGORYFILEPATH = "menu";
//サブカテゴリデータファイル名
export const SUBCATEGORYFILEPATH = "submenu";

//タスクの入力設定値用ファイル名
export const TASKINPUTSETTING = "taskinputsetting";

//メモファイル名
export const MEMOFILENM = `memo`;
//メモ入力設定ファイル名
export const MEMOINPUTSETTINGFILENM = `memoinputsetting`;
//メモコンテンツ設定ファイル名
export const MEMOCONTENTSETTINGFILENM = `memocontentsetting`;
//メモ検索条件設定ファイル名
export const MEMOSEARCHCONDITIONFILENM = `memosearchcondition`;

//CRUDのID
export const CRUD_ID = "5";

//タスクのカテゴリID
export const TASK_CATEGORY_ID = "CATEGORY-5";
//メモのカテゴリID
export const MEMO_CATEGORY_ID = "CATEGORY-6";
//デフォルト属性のカテゴリID
export const DEFAULTATTRIBUTE_CATEGORY_ID = "SUBCATEGORY-1";
//カスタム属性のカテゴリID
export const CUSTOMATTRIBUTE_CATEGORY_ID = "SUBCATEGORY-2";
//検索条件設定のカテゴリID
export const SEARCHCONDITON_CATEGORY_ID = "SUBCATEGORY-3";
//カテゴリ設定のカテゴリID
export const SETTINGCATEGORY_CATEGORY_ID = "SUBCATEGORY-4";
//ユーザー設定(設定画面)のカテゴリID
export const SETTING_USER_CATEGORY_ID = "SUBCATEGORY-5";
//ユーザー設定(個人)のカテゴリID
export const USER_CATEGORY_ID = "CATEGORY-8";


//フラグ
export const FLG = {
    OFF: "0",
    ON: "1",
}

//タグファイル名
export const TAGFILENM = `memotag`;

//画像ファイル名
export const IMAGEFILENM = `image`;