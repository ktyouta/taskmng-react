import { getNowDate } from "../../CommonFunction";
import { authInfoType, userInfoType } from "../../Type/type";

/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddUserData(fileDataObj: userInfoType[], req: any, authResult: authInfoType)
    : userInfoType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: userInfoType = {
        userId: "",
        userName: "",
        auth: "",
        password: "",
        deleteFlg: "",
        registerTime: "",
        updTime: ""
    };
    body = req.body;
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
export function dubUserCheck(fileDataObj: userInfoType[], req: any)
    : string {

    //現在日付を取得
    const nowDate = getNowDate();
    //ユーザーID
    let userId = req.body.userId;

    let tmp = fileDataObj.find((element) => {
        return element.userId === userId;
    });

    if (tmp) {
        return "ユーザーIDが重複しています。"
    }
    return "";
}