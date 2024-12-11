import { authType } from "../../Auth/Type/AuthType";
import { getNowDate } from "../../Common/Function";
import { userInfoType } from "./Type/UserType";

/**
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteUserData(fileDataObj: userInfoType[], userId: string)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを削除
        if (element.userId === userId) {
            element.deleteFlg = "1";
            element.updTime = nowDate;
            return true
        }
    });

    return fileDataObj;
}


/**
 * 削除用の権限データを作成
 * @param fileDataObj 
 * @param requestBody 
 * @returns 
 */
export function createDelUserAuth(fileDataObj: authType[], userId: string,)
    : authType[] {

    //ユーザーIDに一致する権限情報を削除する
    fileDataObj = fileDataObj.filter((element: authType) => {

        return element.userId === userId;
    });

    return fileDataObj;
}