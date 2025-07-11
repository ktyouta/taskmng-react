import { USER_AUTH } from "../Auth/Const/AuthConst";
import { authInfoType, authType } from "../Auth/Type/AuthType";
import { TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { checkAuthAction, getNowDate } from "../Common/Function";
import { resActionAuthType } from "../Common/Type/CommonType";
import { getGeneralDetailData } from "../General/GeneralFunction";
import { getCustomAttributeTaskObj } from "./TaskSelectFunction";
import { taskCustomAttributeSelectType, taskListType } from "./Type/TaskType";



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

    //更新対象のタスクを取得
    let updTask: taskListType | undefined = fileDataObj.find((element) => {
        return element.id === updTaskId;
    });

    //更新対象のタスクが存在しない
    if (!updTask) {
        return fileDataObj;
    }

    //タスクを更新
    updTask.content = body.content;
    updTask.limitTime = body.limitTime;
    updTask.priority = body.priority;
    updTask.status = body.status;
    updTask.title = body.title;
    updTask.updTime = nowDate;

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