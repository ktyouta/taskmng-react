import { JSONEXTENSION, SETTINGFILEPATH, USERINFOFILEPATH } from "../../Common/Const/CommonConst";

//ユーザー情報ファイルのパス
export const USERINFO_FILEPATH = `${SETTINGFILEPATH}${USERINFOFILEPATH}${JSONEXTENSION}`;
//アイコンタイプの選択値
export const SELECT_ICON_TYPE: { [key: string]: string } = {
    NO_SELECT: "1",
    STANDARD: "2",
    ORIGINAL: "3",
}