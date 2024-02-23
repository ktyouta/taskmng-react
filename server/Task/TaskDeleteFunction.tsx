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
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteTaskData(fileDataObj: taskListType[], body: taskListType, delTaskId: string)
    : taskListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    fileDataObj.some((element) => {
        //IDの一致するデータを削除
        if (element.id === delTaskId) {
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

/**
 * カスタム属性の削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDeleteCustomAttributeData(delTaskId: string)
    : taskCustomAttributeSelectType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas: taskCustomAttributeSelectType[] = getCustomAttributeTaskObj();

    customDecodeFileDatas.forEach((element) => {
        //IDの一致するデータを削除
        if (element.taskId === delTaskId) {
            element.deleteFlg = "1";
            element.updTime = nowDate;
        }
    });
    return customDecodeFileDatas;
}