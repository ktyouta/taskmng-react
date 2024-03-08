import { authInfoType } from "../../Auth/Type/AuthType";
import { getNowDate } from "../../Common/Function";
import { createCategoryNewId } from "./CategorySelectFunction";
import { categoryType } from "./Type/CategoryType";


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddCategoryData(fileDataObj: categoryType[], req: any, authResult: authInfoType)
    : categoryType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: categoryType = {
        id: "",
        name: "",
        path: "",
        componentName: "",
        auth: "",
        isHidden: "0",
        deleteFlg: "",
        registerTime: "",
        updTime: "",
        userId: "",
        order: ""
    };
    body = req.body;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.deleteFlg = "0";

    //新しいIDを割り当てる
    body.id = createCategoryNewId(fileDataObj);

    fileDataObj.push(body);
    return fileDataObj;
}
