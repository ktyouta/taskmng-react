import { CUSTOMATTRIBUTESELECT, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { createTaskNewId, getCustomAttributeTaskObj } from "./TaskSelectFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { getNowDate } from "../Common/Function";
import { PRE_TASK_ID } from "./Const/TaskConst";
import { retCreateAddTaskType, taskCustomAttributeSelectType, taskListType } from "./Type/TaskType";
import { authInfoType } from "../Auth/Type/AuthType";


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddTaskData(fileDataObj: taskListType[], req: any, authResult: authInfoType)
    : retCreateAddTaskType {

    let retObj: retCreateAddTaskType = {
        registDatas: [],
        newTaskId: ""
    }

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

    //IDを取得
    let id = createTaskNewId(fileDataObj);
    //新しいIDを割り当てる
    body['id'] = id;
    fileDataObj.push(body);

    retObj.registDatas = fileDataObj;
    retObj.newTaskId = id;

    return retObj;
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
