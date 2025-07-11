import { JSONEXTENSION, MEMOCONTENTSETTINGFILENM, MEMOFILENM, MEMOINPUTSETTINGFILENM, MEMOSEARCHCONDITIONFILENM, SETTINGFILEPATH, TAGFILENM, TRANSACTION } from "../../Common/Const/CommonConst";

//メモファイルのパス
export const MEMO_FILEPATH = `${TRANSACTION}${MEMOFILENM}${JSONEXTENSION}`;
//メモコンテンツ設定ファイルのパス
export const MEMO_CONTENT_FILEPATH = `${SETTINGFILEPATH}${MEMOCONTENTSETTINGFILENM}${JSONEXTENSION}`;
//メモ入力設定ファイルのパス
export const MEMO_INPUTSETTING_FILEPATH = `${SETTINGFILEPATH}${MEMOINPUTSETTINGFILENM}${JSONEXTENSION}`;
//メモIDの接頭辞
export const PRE_MEMO_ID = `MEMOID-`;
//メモの状態
export const MEMO_STATUS = {
    //下書き
    draft: "1",
    //登録
    regist: "2",
}
//メモ検索条件のユーザープロパティID
export const USER_SEARCHCONDITION_ID = "userId";
//タグIDの接頭辞
export const PRE_TAG_ID = `TAGID-`;
//タグプロパティ
export const TAG_PROPERTY = "tag";