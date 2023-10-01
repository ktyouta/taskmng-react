import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, customAttributeListType, customAttributeType, searchConditionType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";


/**
 * カスタム属性の更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCustomAttribute(fileDataObj: customAttributeType[], body: customAttributeType, updTaskId: string)
    : customAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === updTaskId) {
            Object.keys(element).forEach((item) => {
                if (item === `id` || item === `deleteFlg`) return true;
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

/**
 * カスタム属性選択リストの更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdCustomAttributeList(fileDataObj: customAttributeListType[],
    req: any, id: string, authResult: authInfoType)
    : customAttributeListType[] {

    //現在日付を取得
    const nowDate = getNowDate();
    let selectList: string[] = req.body.selectElementList;

    selectList.forEach((element, i) => {
        let tmp = fileDataObj.find((element1) => {
            return element1.id === id && element1.no === i.toString();
        });
        //更新
        if (tmp) {
            tmp.content = element;
            tmp.updTime = nowDate;
            tmp.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
        }
        //登録
        else {
            let body: customAttributeListType = {
                id: id,
                no: (i + 1).toString(),
                content: selectList[i],
                registerTime: nowDate,
                updTime: nowDate,
                userId: authResult.userInfo ? authResult.userInfo?.userId : "",
                deleteFlg: "0",
            };

            fileDataObj.push(body);
        }
    });

    return fileDataObj;
}