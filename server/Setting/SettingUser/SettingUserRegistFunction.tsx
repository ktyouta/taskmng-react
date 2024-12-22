import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { FLG } from "../../Common/Const/CommonConst";
import { getNowDate } from "../../Common/Function";
import { registerAuthReqType, registUserInfoType, updUserInfoType, userInfoType } from "./Type/SettingUserType";

/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddUserData(fileDataObj: userInfoType[], requestBody: registUserInfoType)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: userInfoType = {
        userId: requestBody.userId,
        userName: requestBody.userName,
        password: requestBody.password,
        deleteFlg: FLG.OFF,
        registerTime: nowDate,
        updTime: nowDate,
        iconUrl: requestBody.iconUrl,
        iconType: requestBody.iconType,
    };

    fileDataObj.push(body);
    return fileDataObj;
}

/**
 * IDの重複チェック
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function dubUserCheck(fileDataObj: userInfoType[], body: registUserInfoType)
    : string {

    //現在日付を取得
    const nowDate = getNowDate();
    //ユーザーID
    let userId = body.userId;

    let tmp = fileDataObj.find((element) => {
        return element.userId === userId;
    });

    if (tmp) {
        return "ユーザーIDが重複しています。"
    }
    return "";
}


/**
 * 登録用の権限データを作成
 * @param fileDataObj 
 * @param requestBody 
 * @returns 
 */
export function createAddUserAuth(fileDataObj: authType[], requestBody: authType[])
    : authType[] {

    //リクエスト用の権限リストから登録用の権限リストを作成
    let body: authType[] = requestBody.map((element) => {
        return {
            userId: element.userId,
            menuId: element.menuId,
            auth: element.auth,
        }
    });

    return [...fileDataObj, ...body];
}


/**
 * ユーザーの権限情報が既に登録されているかチェック
 * @param fileDataObj 
 * @param userId 
 */
export function checkDubUserAuth(fileDataObj: authType[], userId: string,) {

    return fileDataObj.some((element) => {
        return element.userId === userId;
    });
}


/**
 * 権限情報リストを登録用の型に変換する
 */
export function convAuthList(addAuthList: registerAuthReqType[], userId: string,): authType[] {

    return addAuthList.map((element: registerAuthReqType) => {

        return {
            userId: userId,
            menuId: element.menuId,
            auth: element.auth,
        }
    });
}