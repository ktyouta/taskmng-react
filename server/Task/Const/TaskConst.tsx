import { CUSTOMATTRIBUTESELECT, JSONEXTENSION, TASKFILENM, TRANSACTION } from "../../Constant";

//タスクファイルのパス
export const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//カスタム属性登録用ファイルのパス
export const CUSTOMATTRIBUTESELECTVALUE_FILE_PATH = `${TRANSACTION}${CUSTOMATTRIBUTESELECT}${JSONEXTENSION}`;
//CRUDモード(登録)
export const CREATE = "1";
//CRUDモード(更新)
export const UPDATE = "2";
//CRUDモード(削除)
export const DELETE = "3";
//タスクIDの接頭辞
export const PRE_TASK_ID = `TASKID-`;
//カスタム属性リストファイルのパス
export const TASK_CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTESELECT}${JSONEXTENSION}`;
//デフォルト属性用の検索条件取得キー
export const SEARCHCONDITION_KEY_DEFAULT = "default";
//カスタム属性用の検索条件取得キー
export const CUSTOMATTRIBUTE_KEY_DEFAULT = "custom";
