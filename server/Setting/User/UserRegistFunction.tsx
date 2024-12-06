import { authInfoType } from "../../Auth/Type/AuthType";
import { getNowDate } from "../../Common/Function";
import { registUserInfoType, updUserInfoType, userInfoType } from "./Type/UserType";

/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddUserData(fileDataObj: userInfoType[], requestBody: registUserInfoType, authResult: authInfoType)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: userInfoType = {
        userId: "",
        userName: "",
        password: "",
        deleteFlg: "",
        registerTime: "",
        updTime: "",
        iconUrl: "",
        iconType: "",
    };
    body = requestBody;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.deleteFlg = "0";

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