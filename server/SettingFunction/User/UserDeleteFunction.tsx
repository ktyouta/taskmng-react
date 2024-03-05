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