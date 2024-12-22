import { getGeneralDetailData } from "../General/GeneralFunction";
import { createDeleteCustomAttributeData, createDeleteTaskData, createMultiDeleteCustomAttributeData, createMultiDeleteTaskData } from "./TaskDeleteFunction";
import { createUpdCustomAttributeData, createUpdTaskData } from "./TaskUpdateFunction";
import { createAddCustomAttributeData, createAddTaskData } from "./TaskRegistFunction";
import { convDefaultTask, createTaskDetailUrl, filterCustomAttribute, filterDefaultAttribute, getConvertTaskListDate, getConvertTasksDate, getCustomAttributeTaskObj, getFilterdTask, getTaskObj, getTasksByUserAuth, joinCustomAttribute } from "./TaskSelectFunction";
import { runAddMultiTaskHistory, runAddTaskHistory } from "../History/HistoryFunction";
import { CREATE, CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, DELETE, TASK_FILEPATH, UPDATE } from "./Const/TaskConst";
import { reqDelSelectedTaskType, reqRecSelectedTaskType, resTaskListType, retDefaultTaskType, taskCustomAttributeSelectType, taskDetailType, taskListType } from "./Type/TaskType";
import { authenticate } from "../Auth/AuthFunction";
import { inputSettingType, resActionAuthType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { getGeneralDataList, getGeneralDetailDataList } from "../General/GeneralSelectFunction";
import { USER_AUTH } from "../Auth/Const/AuthConst";
import { createMultiRecoveryCustomAttributeData, createMultiRecoveryTaskData, createRecoveryCustomAttributeData, createRecoveryTaskData } from "./TaskRecoveryFunction";
import { authInfoType, authType } from "../Auth/Type/AuthType";
import { checkTaskDelAuth, checktaskGetAuth, checktaskGetDetailAuth, checkTaskRecAuth, checkTaskRegistAuth, checkTaskUpdAuth, getUserTaskAuth, multiCheckTaskDelAuth } from "./TaskAuthFunction";
import { userInfoType } from "../Setting/SettingUser/Type/SettingUserType";
import { getUserInfoData } from "../Setting/SettingUser/SettingUserSelectFunction";



/**
 * タスクリストの取得
 */
export function getTaskList(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //タスクリスト取得権限チェック
    let taskGetListAuthResult = checktaskGetAuth(taskAuth);

    //権限エラー
    if (taskGetListAuthResult.message) {
        return res
            .status(taskGetListAuthResult.status)
            .json({ errMessage: taskGetListAuthResult.message });
    }

    //タスク画面のユーザー権限
    let taskUserAuth = taskAuth.auth;
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTasksByUserAuth(taskUserAuth);
    //クエリパラメータ
    let queryStr = req.query;

    //日付変換
    decodeFileData = getConvertTaskListDate(decodeFileData);

    //クエリストリングでフィルター(デフォルト属性)
    decodeFileData = filterDefaultAttribute(decodeFileData, queryStr, taskUserAuth);

    //クエリストリングでフィルター(カスタム属性)
    decodeFileData = filterCustomAttribute(decodeFileData, queryStr, taskUserAuth);

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(200).json(decodeFileData);
    }

    //優先度およびステータスの紐づけを行う
    let resTaskList: resTaskListType[] = joinTask(decodeFileData);

    return res.status(200).json(resTaskList);
}

/**
 * タスク詳細の取得
 */
export function getTaskDetail(res: any, req: any, id: string) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //タスク詳細取得権限チェック
    let taskGetDetailAuthResult = checktaskGetDetailAuth(taskAuth);

    //権限エラー
    if (taskGetDetailAuthResult.message) {
        return res
            .status(taskGetDetailAuthResult.status)
            .json({ errMessage: taskGetDetailAuthResult.message });
    }

    //タスク画面のユーザー権限
    let taskUserAuth = taskAuth.auth;

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTasksByUserAuth(taskUserAuth);

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //詳細を取得
    let singleTaskData: taskListType | undefined = decodeFileData.find((element) => { return element.id === id });
    if (!singleTaskData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //日付変換
    singleTaskData = getConvertTasksDate(singleTaskData);

    //URLを作成
    singleTaskData = createTaskDetailUrl(singleTaskData);

    //カスタム属性の選択値を取得
    let selectedCustomAttributeList: inputSettingType[] = joinCustomAttribute(singleTaskData);

    //デフォルト属性を画面返却用の型に変換
    let retSingleTaskData: retDefaultTaskType = convDefaultTask(singleTaskData);

    let retTaskDetail: taskDetailType = {
        default: retSingleTaskData,
        customAttribute: selectedCustomAttributeList
    };

    return res.status(200).json(retTaskDetail);
}

/**
 * タスクの追加
 */
export function runAddTask(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //タスク登録権限チェック
    let taskRegistAuthResult = checkTaskRegistAuth(taskAuth);

    //権限エラー
    if (taskRegistAuthResult.message) {
        return res
            .status(taskRegistAuthResult.status)
            .json({ errMessage: taskRegistAuthResult.message });
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

    //IDの指定がない
    if (!updTaskId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //更新対象データの存在チェック
    let updTargetTask: taskListType | undefined = decodeFileData.find((element) => {
        return element.id === updTaskId;
    });

    //更新対象のタスクが存在しない
    if (!updTargetTask) {
        return res
            .status(400)
            .json({ errMessage: `更新対象のタスクが存在しません。` });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //タスク更新権限チェック
    let taskUpdAuthResult = checkTaskUpdAuth(authResult.userInfo, updTargetTask, taskAuth);

    //更新権限エラー
    if (taskUpdAuthResult.message) {
        return res
            .status(taskUpdAuthResult.status)
            .json({ errMessage: taskUpdAuthResult.message });
    }

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

    //IDの指定がない
    if (!delTaskId) {
        return res
            .status(400)
            .json({ errMessage: `パスパラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除対象のタスクを取得
    let delTask = decodeFileData.find((element) => {
        return element.id === delTaskId;
    });

    //削除対象のタスクが存在しない
    if (!delTask) {
        return res
            .status(400)
            .json({ errMessage: `削除対象のタスクが存在しません。` });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //削除権限チェック
    let taskDelAuthResult = checkTaskDelAuth(authResult.userInfo, delTask, taskAuth);

    //削除権限エラー
    if (taskDelAuthResult.message) {
        return res
            .status(taskDelAuthResult.status)
            .json({ errMessage: taskDelAuthResult.message });
    }

    //削除用データの作成
    let registData = createDeleteTaskData(decodeFileData, delTaskId);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas: taskCustomAttributeSelectType[] = getCustomAttributeTaskObj();

    //カスタム属性の削除用データを作成
    customDecodeFileDatas = createDeleteCustomAttributeData(customDecodeFileDatas, delTaskId);

    //データを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(customDecodeFileDatas, null, '\t'));

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
 * タスクの複数削除
 */
export function runMultiDeleteTask(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //リクエストボディ
    let reqBody: reqDelSelectedTaskType = req.body;
    //削除対象のタスクIDリスト
    let deleteTaskList: string[] = reqBody.delTaskIdList;

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //削除権限チェック
    let taskDelAuthResult = multiCheckTaskDelAuth(
        decodeFileData,
        authResult.userInfo,
        deleteTaskList,
        taskAuth);

    //削除権限エラー
    if (taskDelAuthResult.message) {
        return res
            .status(taskDelAuthResult.status)
            .json({ errMessage: taskDelAuthResult.message });
    }

    //削除用データの作成
    let registData = createMultiDeleteTaskData(decodeFileData, deleteTaskList);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas: taskCustomAttributeSelectType[] = getCustomAttributeTaskObj();

    //カスタム属性の削除用データを作成
    let delCustomData = createMultiDeleteCustomAttributeData(customDecodeFileDatas, deleteTaskList);

    //データを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(delCustomData, null, '\t'));

    //登録更新削除に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ customErrMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddMultiTaskHistory(authResult, deleteTaskList, DELETE);

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
 * 削除済みタスクの復元を行う
 */
export function runTaskRecovery(res: any, req: any, recoveryTaskId: string,) {

    //IDの指定がない
    if (!recoveryTaskId) {
        return res
            .status(400)
            .json({ errMessage: `パスパラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //復元権限チェック
    let taskRecAuthResult = checkTaskRecAuth(taskAuth);

    //復元権限エラー
    if (taskRecAuthResult.message) {
        return res
            .status(taskRecAuthResult.status)
            .json({ errMessage: taskRecAuthResult.message });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //復元対象のタスクを取得
    let recTask = decodeFileData.find((element) => {
        return element.id === recoveryTaskId;
    });

    //復元対象のタスクが存在しない
    if (!recTask) {
        return res
            .status(400)
            .json({ errMessage: `復元対象のタスクが存在しません。` });
    }

    //復元用データの作成
    let registData = createRecoveryTaskData(decodeFileData, recoveryTaskId);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //復元に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas: taskCustomAttributeSelectType[] = getCustomAttributeTaskObj();

    //カスタム属性の復元用データを作成
    customDecodeFileDatas = createRecoveryCustomAttributeData(customDecodeFileDatas, recoveryTaskId);

    //データを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(customDecodeFileDatas, null, '\t'));

    //復元に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ customErrMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddTaskHistory(authResult, recoveryTaskId, UPDATE);

    //作業履歴の登録に失敗
    if (historyErrMessage) {
        return res
            .status(400)
            .json({ historyErrMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `復元が完了しました。` });
}


/**
 * タスクの複数復元
 */
export function runMultiRecoveryTask(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タスク画面の権限を取得する
    let taskAuth: authType | undefined = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskAuth || !taskAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限がありません。" });
    }

    //復元権限チェック
    let taskRecAuthResult = checkTaskRecAuth(taskAuth);

    //復元権限エラー
    if (taskRecAuthResult.message) {
        return res
            .status(taskRecAuthResult.status)
            .json({ errMessage: taskRecAuthResult.message });
    }

    //リクエストボディ
    let reqBody: reqRecSelectedTaskType = req.body;
    //復元対象のタスクIDリスト
    let recoveryTaskList: string[] = reqBody.recTaskIdList;

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //復元用データの作成
    let registData = createMultiRecoveryTaskData(decodeFileData, recoveryTaskList);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //復元に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //タスクのカスタム属性の選択値ファイルの読み込み
    let customDecodeFileDatas: taskCustomAttributeSelectType[] = getCustomAttributeTaskObj();

    //カスタム属性の復元用データを作成
    let delCustomData = createMultiRecoveryCustomAttributeData(customDecodeFileDatas, recoveryTaskList);

    //データを登録
    let customErrMessage = overWriteData(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, JSON.stringify(delCustomData, null, '\t'));

    //復元に失敗
    if (customErrMessage) {
        return res
            .status(400)
            .json({ customErrMessage });
    }

    //作業履歴の登録
    let historyErrMessage = runAddMultiTaskHistory(authResult, recoveryTaskList, UPDATE);

    //作業履歴の登録に失敗
    if (historyErrMessage) {
        return res
            .status(400)
            .json({ historyErrMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `復元が完了しました。` });
}


/**
 * タスクのjoinを行う
 */
function joinTask(decodeFileData: taskListType[]): resTaskListType[] {

    //汎用詳細ファイルの読み込み
    let generalList = getGeneralDataList();
    //タスク優先度リスト
    let taskPriorityList = getGeneralDetailDataList(generalList, "2");
    //タスクステータスリスト
    let taskStatusList = getGeneralDetailDataList(generalList, "3");
    //ユーザー情報の読み込み
    let userInfoList: userInfoType[] = getUserInfoData();

    //優先度およびステータスの紐づけを行う
    let joinTaskData: resTaskListType[] = [];

    decodeFileData.forEach((element: taskListType) => {

        let priorityLabel;
        let statusLabel;
        let userName;

        //優先度が一致
        let taskPriorityObj = taskPriorityList.find((item) => {
            return item.value === element.priority;
        });

        //ステータスが一致
        let taskStatusObj = taskStatusList.find((item) => {
            return item.value === element.status;
        });

        //ユーザーIDが一致
        let userInfoObj = userInfoList.find((item) => {
            return item.userId === element.userId;
        });

        //優先度
        if (taskPriorityObj && taskStatusObj) {
            priorityLabel = taskPriorityObj.label;
        }

        //ステータス
        if (taskStatusObj) {
            statusLabel = taskStatusObj.label;
        }

        //ユーザー情報
        if (userInfoObj) {
            userName = userInfoObj.userName;
        }

        //ラベルをセット
        joinTaskData.push({
            ...element,
            priorityLabel: priorityLabel,
            statusLabel: statusLabel,
            userName: userName
        });
    });
    return joinTaskData;
}
