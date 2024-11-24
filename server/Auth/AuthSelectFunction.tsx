import { readFile } from "../Common/FileFunction";
import { AUTH_FILEPATH } from "./Const/AuthConst";
import { authType } from "./Type/AuthType";

/**
 * 権限データを取得
 * @returns 
 */
export function getAuthObjList() {
    //権限ファイルの読み込み
    let authData = readFile(AUTH_FILEPATH);
    let decodeAuthData: authType[] = JSON.parse(authData);
    return decodeAuthData;
}

/**
 * ユーザーの権限情報を取得する
 */
export function getUserAuthList(authData: authType[], userId: string,) {

    return authData.filter((element) => {
        return element.userId === userId;
    });
}