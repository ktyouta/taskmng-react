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
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddTaskData(fileDataObj: taskListType[], req: any, authResult: authInfoType)
    : taskListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let body: taskListType = {
        id: "",
        content: "",
        registerTime: "",
        updTime: "",
        limitTime: "",
        userId: "",
        priority: "",
        status: "",
        deleteFlg: "",
        title: ""
    };
    body = req.body;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    //未対応
    //body.status = "1";
    body.deleteFlg = "0";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_TASK_ID}`, "");
    //新しいIDを割り当てる
    body['id'] = `${PRE_TASK_ID}${parseInt(id) + 1}`;
    fileDataObj.push(body);
    return fileDataObj;
}