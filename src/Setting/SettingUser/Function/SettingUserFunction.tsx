import { SELECT_ICON_TYPE, USERINFO_ACTION_TYPE } from "../Const/SettingUserConst";
import { userInputType } from "../Type/SettingUserType";

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

//入力欄の更新処理
export function updateUserData(state: userInputType, action: { type: string, payload?: string }) {
    switch (action.type) {
        //ID
        case USERINFO_ACTION_TYPE.ID:
            return { ...state, userId: action.payload };
        //ユーザー名
        case USERINFO_ACTION_TYPE.NAME:
            return { ...state, userName: action.payload };
        //パスワード
        case USERINFO_ACTION_TYPE.PASS:
            return { ...state, password: action.payload };
        //権限
        case USERINFO_ACTION_TYPE.AUTH:
            return { ...state, auth: action.payload };
        //アイコンURL
        case USERINFO_ACTION_TYPE.ICON_URL:
            return { ...state, iconUrl: action.payload };
        //アイコンタイプ
        case USERINFO_ACTION_TYPE.ICON_TYPE:
            return { ...state, iconType: action.payload };
        default:
            return state;
    }
}