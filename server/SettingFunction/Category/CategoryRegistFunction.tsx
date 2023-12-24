import { getNowDate } from "../../CommonFunction";
import { authInfoType } from "../../Type/type";
import { categoryType } from "./Type/CategoryType";


//カテゴリIDの接頭辞
const PRE_CATEGORY_ID = `CATEGORY-`;


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
        isHidden: false,
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

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_CATEGORY_ID}`, "");
    //新しいIDを割り当てる
    body['id'] = `${PRE_CATEGORY_ID}${parseInt(id) + 1}`;

    fileDataObj.push(body);
    return fileDataObj;
}
