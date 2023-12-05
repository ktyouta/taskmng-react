import { authenticate } from "../AuthFunction";
import { CUSTOMATTRIBUTESELECT, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, searchConditionType, taskCustomAttributeSelectType, taskListType } from "../Type/type";
import { getNowDate } from "../CommonFunction";
import { getCustomAttributeTaskObj } from "./TaskSelectFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";

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
        title: "",
        deleteFlg: ""
    };
    body = req.body.default;
    body.registerTime = nowDate;
    body.updTime = nowDate;
    body.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    body.deleteFlg = "0";
    //未対応
    //body.status = "1";

    let fileDataObjLen = fileDataObj.length;
    //IDを取得
    let id = fileDataObjLen === 0 ? "1" : fileDataObj[fileDataObjLen - 1]['id'].replace(`${PRE_TASK_ID}`, "");
    //新しいIDを割り当てる
    body['id'] = `${PRE_TASK_ID}${parseInt(id) + 1}`;
    fileDataObj.push(body);
    return fileDataObj;
}


/**
 * カスタム属性の登録用データの作成
 * @param fileDataObj 
 * @param req 
 * @param authResult 
 * @returns 
 */
export function createAddCustomAttributeData(req: any, authResult: authInfoType,
    registDatas: taskListType[])
    : taskCustomAttributeSelectType[] {

    let tmpBody: taskCustomAttributeSelectType[] = [];

    //現在日付を取得
    const nowDate = getNowDate();

    //カスタム属性ファイルの読み込み
    let customDecodeFileData = getCustomAttributeTaskObj();

    //カスタム属性が存在しない
    if (!req.body || !req.body.customAttribute || req.body.customAttribute.length === 0) {
        return customDecodeFileData;
    }

    //タスクが登録されていない
    if (!registDatas || !Array.isArray(registDatas) || registDatas.length === 0) {
        return customDecodeFileData;
    }

    //新規登録するタスクのID
    let registTaskId = registDatas[registDatas.length - 1].id;
    let tmpCustomAttribute: taskCustomAttributeSelectType[] = req.body.customAttribute;

    tmpCustomAttribute.forEach((element) => {
        tmpBody.push({
            taskId: registTaskId,
            customAttributeId: element.customAttributeId,
            selectedValue: element.selectedValue,
            registerTime: nowDate,
            updTime: nowDate,
            deleteFlg: "0",
            userId: authResult.userInfo ? authResult.userInfo?.userId : ""
        });
    });

    return [...customDecodeFileData, ...tmpBody];
}
