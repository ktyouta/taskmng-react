import { USER_AUTH } from "../../../Common/Const/CommonConst";
import { checkAuthAction } from "../../../Common/Function/Function";
import { authType } from "../../../Common/Hook/useCheckAuth";
import { generalDataType, menuListType } from "../../../Common/Type/CommonType";
import { SELECT_ICON_TYPE, USERINFO_ACTION_TYPE } from "../Const/SettingUserConst";
import { selectAuthType } from "../Hook/useSettingUserInputAuthList";
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


/**
 * 入力用の権限情報リストを作成する
 * @param menuList 
 * @param inputUserAuthList 
 * @param authLabelList 
 * @param userId 
 * @returns 
 */
export function getInputAuthObjList(
    menuList: menuListType[],
    inputUserAuthList: authType[],
    authLabelList: generalDataType[],
    userId: string,
    parentId: string,): selectAuthType[] {

    let tmpSelectAuthList: selectAuthType[] = menuList.reduce((prev: selectAuthType[], current: menuListType) => {

        //ユーザーの権限リストからメニューIDに一致するデータを取得する
        let userAuthObj = inputUserAuthList.find((element1) => {
            return element1.menuId === current.id;
        });

        let selectValue;

        //ユーザーの権限リストに存在する場合は権限リストの値を設定する
        if (userAuthObj) {
            selectValue = userAuthObj.auth;
        }
        //ユーザーの権限リストに存在しない場合は汎用詳細から取得したリストの先頭の値を設定する
        else {
            selectValue = authLabelList[0].value;
        }

        let selectAuthObj: selectAuthType = {
            menuId: current.id,
            menuName: current.name,
            auth: selectValue,
            userId: userId,
            authLabelList: authLabelList,
            parentMenuId: parentId,
            isContainSubMenu: false
        };

        let subMenuList: selectAuthType[] = [];

        //サブメニューを保持している場合、リストの取得メソッドを再帰的に呼び出す
        if (current.subCategoryList && current.subCategoryList.length) {

            selectAuthObj.isContainSubMenu = true;

            subMenuList = getInputAuthObjList(
                current.subCategoryList,
                inputUserAuthList,
                authLabelList,
                userId,
                current.id,
            );
        }

        prev.push(selectAuthObj);

        //サブメニューをリストに追加
        subMenuList.forEach((element2) => {
            prev.push(element2);
        });

        return prev;
    }, []);

    return tmpSelectAuthList;
}


/**
 * 登録更新用の権限リストを確認する
 * @param inputUserAuthList 
 * @returns 
 */
export function checkUpdAuthList(inputUserAuthList: authType[]) {

    return inputUserAuthList.every((element) => {

        //一般権限未満の要素をチェックする
        return !checkAuthAction(element.auth, USER_AUTH.PUBLIC);
    });
}