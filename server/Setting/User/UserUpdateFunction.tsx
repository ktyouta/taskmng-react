import { authType } from "../../Auth/Type/AuthType";
import { getNowDate } from "../../Common/Function";
import { registerAuthReqType, updUserInfoType, userInfoType } from "./Type/UserType";

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
    userData.updTime = nowDate;
    userData.iconUrl = requestBody.iconUrl;
    userData.iconType = requestBody.iconType;

    return fileDataObj;
}


/**
 * 更新用の権限データを作成
 * @param fileDataObj 
 * @param requestBody 
 * @returns 
 */
export function createUpdUserAuth(fileDataObj: authType[], requestBody: registerAuthReqType[])
    : authType[] {

    //追加用の権限情報リスト
    let addAuthList: authType[] = [];

    requestBody.forEach((element: registerAuthReqType) => {

        //ユーザーIDとメニューIDに一致するデータを取得する
        let updAuthObj = fileDataObj.find((element1: authType) => {
            return element1.userId === element.userId && element1.menuId === element.menuId;
        });

        //権限情報が存在する場合は権限を更新する
        if (updAuthObj) {
            updAuthObj.auth = element.auth;
        }
        //権限情報が存在しない場合は追加する
        else {
            addAuthList = [...addAuthList, {
                userId: element.userId,
                menuId: element.menuId,
                auth: element.auth,
            }]
        }
    });

    return [...fileDataObj, ...addAuthList];
}