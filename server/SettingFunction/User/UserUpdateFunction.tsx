import { getNowDate } from "../../CommonFunction";
import { userInfoType } from "../../Type/type";

/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdUserData(fileDataObj: userInfoType[], req: any, userId: string)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.userId === userId) {
            element.userId = req.body.userId;
            element.userName = req.body.userName;
            element.password = req.body.password;
            element.auth = req.body.auth;
            element.updTime = nowDate;
            return true
        }
    });

    return fileDataObj;
}