import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { authInfoType, generalDetailType, taskListType } from "../../Type/type";
import { defaultAttributeType, defaultAttributeUpdType, selectListType } from "./Type/DefaultAttributeType";
import { getNowDate } from "../../Common/Function";


/**
 * デフォルト属性の更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdDefaultAttribute(fileDataObj: defaultAttributeType[], body: defaultAttributeUpdType, updDAId: string)
    : defaultAttributeType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを更新
        if (element.id === updDAId) {
            Object.keys(element).forEach((item) => {
                //更新日時
                if (item === `updTime`) {
                    element[item] = nowDate;
                    return true;
                }
                if (!body.hasOwnProperty(item)) return true;
                if (item === `id` || item === `deleteFlg` || item === 'registerTime') return true;
                element[item] = body[item];
            });
            return true;
        }
    });

    return fileDataObj;
}

/**
 * 選択リストの更新
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdDefaultAttributeSelectList(fileDataObj: generalDetailType[],
    defaultDatas: defaultAttributeType[], updDAId: string, selectElementList: selectListType[])
    : generalDetailType[] {

    //IDで絞り込む
    let defaultData = defaultDatas.find((element) => {
        return element.id === updDAId;
    });

    //IDに一致するデータが存在しない場合
    if (!defaultData) {
        return fileDataObj;
    }

    //リストキー
    let listKey = defaultData.listKey;

    //リストキーが存在しない場合
    if (!listKey) {
        return fileDataObj;
    }

    //リストキーに一致するデータを取得
    let updGeneralDatas = fileDataObj.filter((element) => {
        return element.id === listKey;
    });

    //選択リストを更新
    selectElementList.forEach((element) => {
        let tmp = updGeneralDatas.find((element1) => {
            return element1.value === element.value;
        });
        if (!tmp) {
            return;
        }
        tmp.label = element.label;
    });

    return fileDataObj;
}