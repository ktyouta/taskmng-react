import { AUTHORIRY, JSONEXTENSION, SETTINGFILEPATH } from "../../Common/Const/CommonConst";

//ユーザー権限
export const USER_AUTH = {
    NONE: "0",
    PUBLIC: "1",
    EXCLUSIVE: "2",
    ADMIN: "3",
}
//権限ファイルのパス
export const AUTH_FILEPATH = `${SETTINGFILEPATH}${AUTHORIRY}${JSONEXTENSION}`;