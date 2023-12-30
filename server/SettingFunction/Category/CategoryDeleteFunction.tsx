import { getNowDate } from "../../CommonFunction";
import { authInfoType } from "../../Type/type";
import { categoryType } from "./Type/CategoryType";


//カテゴリIDの接頭辞
const PRE_CATEGORY_ID = `CATEGORY-`;


/**
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDelCategoryData(fileDataObj: categoryType[], req: any, authResult: authInfoType, id: string)
    : categoryType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === id) {
            element.userId = authResult.userInfo ? authResult.userInfo?.userId : "";;
            element.updTime = nowDate;
            element.deleteFlg = "1";
            return true
        }
    });

    return fileDataObj;
}
