import { authenticate } from "../AuthFunction";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, searchConditionType, taskListType } from "../Type/type";
import { getNowDate } from "../CommonFunction";
import { createDeleteTaskData } from "./TaskDeleteFunction";
import { createUpdTaskData } from "./TaskUpdateFunction";
import { createAddTaskData } from "./TaskRegistFunction";
import { filterTask } from "./TaskSelectFunction";

//タスクファイルのパス
const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;

/**
 * タスクの取得
 */
export function getTask(res: any, req: any, id?: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //クエリストリングでフィルター
    decodeFileData = filterTask(decodeFileData, req.query);

    //優先度およびステータスの紐づけを行う
    //let joinTaskData: taskListType[] = joinTask(decodeFileData);

    //カスタム属性と結合


    //パスパラメータの指定あり
    if (id) {
        let singleTaskData = decodeFileData.find((element) => { return element.id === id });
        if (!singleTaskData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
        }
        return res.status(200).json(singleTaskData);
    }

    return res.status(200).json(decodeFileData);
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
    let registData = createAddTaskData(decodeFileData, req, authResult);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * タスクの更新
 */
export function runUpdTask(res: any, req: any, pathPrm: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!pathPrm) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //更新用データの作成
    let registData = createUpdTaskData(decodeFileData, req.body, pathPrm);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * タスクの削除
 */
export function runDeleteTask(res: any, req: any, pathPrm: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!pathPrm) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除用データの作成
    let registData = createDeleteTaskData(decodeFileData, req.body, pathPrm);

    //データを登録
    let errMessage = overWriteData(TASK_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}


/**
 * タスクファイルからオブジェクトを取得
 */
function getTaskObj(): taskListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_FILEPATH);
    return JSON.parse(fileData);
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
