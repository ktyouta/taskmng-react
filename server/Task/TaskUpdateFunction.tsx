import { authenticate } from "../AuthFunction";
import { getNowDate } from "../Common/Function";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { authInfoType, taskCustomAttributeSelectType, taskListType } from "../Type/type";
import { getCustomAttributeTaskObj } from "./TaskSelectFunction";

//タスクファイルのパス
const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//タスクIDの接頭辞
const PRE_TASK_ID = `TASKID-`;

/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdTaskData(fileDataObj: taskListType[], body: taskListType, updTaskId: string)
    : taskListType[] {

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
 * カスタム属性の更新用データの作成
 * @param fileDataObj 
 * @param req 
 * @param authResult 
 * @returns 
 */
export function createUpdCustomAttributeData(req: any, authResult: authInfoType,
    updTaskId: string)
    : taskCustomAttributeSelectType[] {

    let tmpBody: taskCustomAttributeSelectType[] = [];
    let userId = authResult.userInfo ? authResult.userInfo?.userId : "";

    //現在日付を取得
    const nowDate = getNowDate();

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas = getCustomAttributeTaskObj();

    //カスタム属性が存在しない
    if (!req.body || !req.body.customAttribute || req.body.customAttribute.length === 0) {
        return customDecodeFileDatas;
    }

    //リクエスト(カスタム属性)
    let tmpCustomAttribute: taskCustomAttributeSelectType[] = req.body.customAttribute;

    tmpCustomAttribute.forEach((element) => {

        //taskIdとcustomAttributeIdでデータが取得できる場合は更新する
        let customDecodeFileData = customDecodeFileDatas.find((element1) => {
            return element1.taskId === updTaskId && element1.customAttributeId === element.customAttributeId;
        });

        //更新
        if (customDecodeFileData) {
            customDecodeFileData.selectedValue = element.selectedValue;
            customDecodeFileData.updTime = nowDate;
            customDecodeFileData.userId = userId;
        }
        //登録
        else {
            tmpBody.push({
                taskId: updTaskId,
                customAttributeId: element.customAttributeId,
                selectedValue: element.selectedValue,
                registerTime: nowDate,
                updTime: nowDate,
                deleteFlg: "0",
                userId: userId
            });
        }
    });

    return [...customDecodeFileDatas, ...tmpBody];
}