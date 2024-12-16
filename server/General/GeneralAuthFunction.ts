import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authType } from "../Auth/Type/AuthType";
import { checkAuthAction } from "../Common/Function";
import { resUserInfoType } from "../Setting/User/Type/UserType";

/**
 * 一般権限以上の権限リストを取得する
 */
export function getValidMenuAuth(userInfo: resUserInfoType) {

    //ユーザーの権限リストからメニューの権限を取得する
    return userInfo.authList.filter((element: authType) => {

        return checkAuthAction(element.auth, USER_AUTH.PUBLIC);
    });
}