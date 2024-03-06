import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { inputSettingType } from "../Type/type";
import { createDeleteCustomAttributeData, createDeleteTaskData } from "./TaskDeleteFunction";
import { createUpdCustomAttributeData, createUpdTaskData } from "./TaskUpdateFunction";
import { createAddCustomAttributeData, createAddTaskData } from "./TaskRegistFunction";
import { createTaskDetailUrl, filterCustomAttribute, filterDefaultAttribute, getCustomAttributeTaskObj, getFilterdTask, getTaskObj, joinCustomAttribute } from "./TaskSelectFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { CREATE, CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, DELETE, TASK_FILEPATH, UPDATE } from "./Const/TaskConst";
import { taskDetailType, taskListType } from "./Type/TaskType";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";



/**
 * タスクリストの取得
 */
export function getTaskList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getFilterdTask();
    let queryStr = req.query;

    //クエリストリングでフィルター(デフォルト属性)
    decodeFileData = filterDefaultAttribute(decodeFileData, queryStr);

    //クエリストリングでフィルター(カスタム属性)
    decodeFileData = filterCustomAttribute(decodeFileData, queryStr);

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(200).json(decodeFileData);
    }

    //優先度およびステータスの紐づけを行う
    //let joinTaskData: taskListType[] = joinTask(decodeFileData);

    return res.status(200).json(decodeFileData);
}

/**
 * タスク詳細の取得
 */
export function getTaskDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getFilterdTask();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //詳細を取得
    let singleTaskData = decodeFileData.find((element) => { return element.id === id });
    if (!singleTaskData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //URLを作成
    singleTaskData = createTaskDetailUrl(singleTaskData);

    //カスタム属性の選択値を取得
    let selectedCustomAttributeList: inputSettingType[] = joinCustomAttribute(singleTaskData);

    let retTaskDetail: taskDetailType = {
        default: singleTaskData,
        customAttribute: selectedCustomAttributeList
    };

    return res.status(200).json(retTaskDetail);
}

/**
 * タスクの追加
 */
export function runAddTask(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //登録用データの作成
    let retObj = createAddTaskData(decodeFileData, req, authResult);

    //タスクが登録されていない
    if (!retObj.registDatas || retObj.registDatas.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "タスクの登録に失敗しました。" });
    }

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(retObj.registDatas, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //カスタム属性の登録用データを作成
    let registCustomData = createAddCustomAttributeData(req, authResult, retObj.registDatas);

    //カスタム属性のデータを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(registCustomData, null, '\t'));

    //登録更新削除に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddTaskHistory(authResult, retObj.newTaskId, CREATE);

    //作業履歴の登録に失敗
    if (historyErrMessage) {
        return res
            .status(400)
            .json({ historyErrMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * タスクの更新
 */
export function runUpdTask(res: any, req: any, updTaskId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!updTaskId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //更新用データの作成
    let updData = createUpdTaskData(decodeFileData, req.body.default, updTaskId);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(updData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //カスタム属性の更新用データの作成
    let updCustomData = createUpdCustomAttributeData(req, authResult, updTaskId);

    //カスタム属性のデータを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(updCustomData, null, '\t'));

    //登録更新削除に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddTaskHistory(authResult, updTaskId, UPDATE);

    //作業履歴の登録に失敗
    if (historyErrMessage) {
        return res
            .status(400)
            .json({ historyErrMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * タスクの削除
 */
export function runDeleteTask(res: any, req: any, delTaskId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!delTaskId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除用データの作成
    let registData = createDeleteTaskData(decodeFileData, req.body, delTaskId);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //カスタム属性の削除用データを作成
    let delCustomData = createDeleteCustomAttributeData(delTaskId);

    //データを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(delCustomData, null, '\t'));

    //登録更新削除に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ customErrMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddTaskHistory(authResult, delTaskId, DELETE);

    //作業履歴の登録に失敗
    if (historyErrMessage) {
        return res
            .status(400)
            .json({ historyErrMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}

/**
 * タスクのjoinを行う
 */
function joinTask(decodeFileData: taskListType[]) {
    //汎用詳細データを取得
    //タスク優先度リスト
    let taskPriorityList = getGeneralDetailData("2");

    //タスクステータスリスト
    let taskStatusList = getGeneralDetailData("3");

    //優先度およびステータスの紐づけを行う
    let joinTaskData: taskListType[] = [];
    decodeFileData.forEach((element) => {
        let isMatchPriority = false;
        let isMatchStatus = false;
        taskPriorityList.some((item) => {
            //優先度が一致
            if (element.priority === item.value) {
                element.priority = item.label;
                return isMatchPriority = true;
            }
        });
        taskStatusList.some((item) => {
            //ステータスが一致
            if (element.status === item.value) {
                element.status = item.label;
                return isMatchStatus = true;
            }
        });
        //優先度とステータスの結合に成功したデータのみクライアントに返却する
        if (isMatchPriority && isMatchStatus) {
            joinTaskData.push(element);
        }
    });
    return joinTaskData;
}
