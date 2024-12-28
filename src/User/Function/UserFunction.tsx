import { USERINFO_ACTION_TYPE } from "../Const/UserConst";
import { userInfoInputType } from "../Type/UserType";


//入力欄の更新処理
export function updateUserData(state: userInfoInputType, action: { type: string, payload?: string }) {
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