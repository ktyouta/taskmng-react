import { getNowDate } from "../../CommonFunction";
import { authInfoType } from "../../Type/type";
import { categoryType, checkOrderType } from "./Type/CategoryType";


//カテゴリIDの接頭辞
const PRE_CATEGORY_ID = `CATEGORY-`;


/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCategoryData(fileDataObj: categoryType[], req: any, authResult: authInfoType, id: string)
    : categoryType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === id) {
            element.userId = authResult.userInfo ? authResult.userInfo?.userId : "";;
            element.auth = req.body.auth;
            element.updTime = nowDate;
            element.componentName = req.body.componentName;
            element.name = req.body.name;
            element.path = req.body.path;
            element.isHidden = req.body.isHidden;
            return true
        }
    });

    return fileDataObj;
}

/**
 * 表示順更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCategoryOrderData(fileDataObj: categoryType[], authResult: authInfoType, body: checkOrderType[])
    : categoryType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    body.forEach((element) => {
        //IDの一致するデータを更新
        let tmp = fileDataObj.find((element1) => {
            return element1.id === element.id;
        });
        if (tmp) {
            tmp.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
            tmp.updTime = nowDate;
            tmp.order = element.order;
        }
    });

    return fileDataObj;
}
