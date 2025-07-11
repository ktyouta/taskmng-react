import { getAuthObjList, getUserAuthList } from "../Auth/AuthSelectFunction";
import { authType } from "../Auth/Type/AuthType";
import { readFile } from "../Common/FileFunction";
import { USERINFO_FILEPATH } from "./Const/UserConst";
import { resUserInfoType, userInfoType } from "./Type/UserType";


/**
 * ユーザーファイルからオブジェクトを取得
 */
export function getuserListObj(): userInfoType[] {
    //ユーザーファイルの読み込み
    let fileData = readFile(USERINFO_FILEPATH);
    return JSON.parse(fileData);
}


/**
 * ユーザー情報を取得
 */
export function getUserInfoData() {

    //カスタム属性の読み込み
    let decodeFileData: userInfoType[] = getuserListObj();

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * レスポンス用のユーザー情報を作成
 */
export function createRestUserInfo(userInfoObj: userInfoType): resUserInfoType {

    let resUserInfoObj = {
        userId: userInfoObj.userId,
        userName: userInfoObj.userName,
        password: userInfoObj.password,
        iconUrl: userInfoObj.iconUrl,
        iconType: userInfoObj.iconType,
    };

    return resUserInfoObj;
}


/**
 * ユーザーの権限情報リストを取得する
 * @param userId 
 * @returns 
 */
export function getUserAuth(userId: string,) {

    //権限情報を取得する
    let authList = getAuthObjList();

    //ユーザーの権限情報を取得する
    let userAuthList = getUserAuthList(authList, userId);

    return userAuthList;
}