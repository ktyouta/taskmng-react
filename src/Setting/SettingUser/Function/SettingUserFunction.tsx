import { SELECT_ICON_TYPE } from "../Const/SettingUserConst";

/**
 * アイコンタイプのチェック
 */
export function isCorrectIconType(iconType?: string,) {

    if (!iconType) {
        return false;
    }

    return Object.keys(SELECT_ICON_TYPE).map((element) => {
        return SELECT_ICON_TYPE[element];
    }).some((element) => {
        return element === iconType;
    });
}