import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASK_PRIVATE_SEARCHCONDITION_FILEPATH, TRANSACTION } from "../../../Common/Const/CommonConst";

//検索条件設定ファイルのパス
export const SEARCHCONDITION_FILE_PATH = `${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`;
//検索条件取得用のクリストリングキー
export const SEARCHCONDITION_QUERYLRY = "attribute";
//デフォルト属性
export const ATTRIBUTE_KEY_DEFAULT = "default";
//カスタム属性
export const ATTRIBUTE_KEY_CUSTOM = "custom";
//タスク検索条件設定ファイルのパス
export const TASK_PRIVATE_SEARCHCONDITION_FILE_PATH = `${TRANSACTION}${TASK_PRIVATE_SEARCHCONDITION_FILEPATH}${JSONEXTENSION}`;