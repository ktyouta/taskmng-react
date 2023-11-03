import { authenticate } from "../AuthFunction";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, searchConditionType, taskListType } from "../Type/type";
import { getNowDate } from "../CommonFunction";

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