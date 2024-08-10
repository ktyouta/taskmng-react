import { getNowDate } from "../../Common/Function";
import { updUserInfoType, userInfoType } from "./Type/UserType";

/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdUserData(fileDataObj: userInfoType[], requestBody: updUserInfoType, userId: string)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    let userData = fileDataObj.find((element) => {
        return element.userId === userId;
    });

    if (!userData) {
        return fileDataObj;
    }

    userData.userId = requestBody.userId;
    userData.userName = requestBody.userName;
    userData.password = requestBody.password;
    userData.auth = requestBody.auth;
    userData.updTime = nowDate;
    userData.iconUrl = requestBody.iconUrl;
    userData.iconType = requestBody.iconType;

    return fileDataObj;
}