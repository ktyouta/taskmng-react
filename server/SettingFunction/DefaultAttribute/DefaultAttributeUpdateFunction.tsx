import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, searchConditionType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";
import { defaultAttributeType } from "./Type/DefaultAttributeType";


/**
 * デフォルト属性の更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdDefaultAttribute(fileDataObj: defaultAttributeType[], body: defaultAttributeType, updTaskId: string)
    : defaultAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === updTaskId) {
            Object.keys(element).forEach((item) => {
                if (item === `id` || item === `deleteFlg` || item === 'selectElementListId' || item === 'registerTime') return true;
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                element[item] = body[item];
            });
            return true;
        }
    });

    return fileDataObj;
}