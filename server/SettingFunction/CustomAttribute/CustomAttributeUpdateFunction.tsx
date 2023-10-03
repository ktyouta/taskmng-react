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
import { CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, registSelectListRetType } from "./CustomAttributeFunction";
import { createAddCustomAttributeList } from "./CustomAttributeRegistFunction";


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

/**
 * カスタム属性の追加および更新
 * @param fileDataObj 
 * @param req 
 * @param id 
 * @param authResult 
 * @returns 
 */
export function updCustomAttributeList(updCaData: customAttributeType[], filterdCaData: customAttributeType,
    req: any, caId: string, authResult: authInfoType)
    : string {

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
    let updCaLists: customAttributeListType[] = [];

    let selectListId = filterdCaData.selectElementListId;
    //カスタム属性リストのIDが存在する場合はリストを更新する
    if (selectListId) {
        //更新データの作成
        updCaLists = createUpdCustomAttributeList(calDecodeFileData, req, selectListId, authResult);
    }
    //リストの新規登録
    else {
        let calRegistData: registSelectListRetType = {
            errMsg: "",
            registSelectList: []
        };
        let tmp = updCaData.find((element) => { return element.id === caId });

        if (!tmp) {
            return "更新対象のデータが存在しません。";
        }

        //カスタム属性リストの登録用データの作成
        calRegistData = createAddCustomAttributeList(calDecodeFileData, req, tmp, authResult);

        //IDの整合性エラー
        if (calRegistData.errMsg) {
            return calRegistData.errMsg;
        }
        updCaLists = calRegistData.registSelectList;
    }

    //データを更新
    return overWriteData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, JSON.stringify(updCaLists, null, '\t'));
}