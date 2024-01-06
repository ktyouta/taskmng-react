import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { getNowDate } from "../../CommonFunction";
import { defaultAttributeType } from "./Type/DefaultAttributeType";


/**
 * デフォルト属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteDefaultAttribute(fileDataObj: defaultAttributeType[], delCaId: string)
    : defaultAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを削除
        if (element.id === delCaId) {
            Object.keys(element).forEach((item) => {
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                //削除フラグを立てる
                if (item === `deleteFlg`) {
                    element[item] = "1";
                    return true;
                }
            });
            return true;
        }
    });
    return fileDataObj;
}
