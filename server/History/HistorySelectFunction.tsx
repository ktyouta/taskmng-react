import { getGeneralDataList } from "../Common/Function";
import { GENERALDETAILFILEPATH, JSONEXTENSION, MASTERFILEPATH, SETTINGFILEPATH, TASKHISTORYPATH, TRANSACTION, USERINFOFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { TASK_FILEPATH } from "../Task/TaskSelectFunction";
import { generalDetailType, taskListType, userInfoType } from "../Type/type";
import { TASK_HISTORY_PATH } from "./HistoryFunction";
import { addTaskHistoryType, taskHistoryType } from "./Type/HistoryType";


//汎用詳細ファイルのパス
const GENERAL_DETAIL_FILEPATH = `${MASTERFILEPATH}${GENERALDETAILFILEPATH}${JSONEXTENSION}`;
//ユーザー情報ファイルのパス
const USER_INFO_FILEPATH = `${SETTINGFILEPATH}${USERINFOFILEPATH}${JSONEXTENSION}`;

//CRUDのID
const CRUD_ID = "5";

/**
 * タスクの作業履歴を取得
 */
export function getTaskHistoryObj(): taskHistoryType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_HISTORY_PATH);
    return JSON.parse(fileData);
}

/**
 * タスクの作業履歴の絞り込み
 */
export function getFilterdTaskHistory() {
    //タスクファイルの読み込み
    let decodeFileData: taskHistoryType[] = getTaskHistoryObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * 汎用詳細/設定と紐づける
 */
export function joinGeneralSetting(decodeFileData: taskHistoryType[]) {

    //汎用詳細ファイルの読み込み
    let decodeGeneralData: generalDetailType[] = getGeneralDataList();

    //ユーザーファイルの読み込み
    let userFileData = readFile(USER_INFO_FILEPATH);
    let decodeUserFileData: userInfoType[] = JSON.parse(userFileData);

    //タスクファイルの読み込み
    let taskFileData = readFile(TASK_FILEPATH);
    let decodeTaskFileData: taskListType[] = JSON.parse(taskFileData);

    decodeFileData.forEach((element) => {

        //CRUDの紐づけ
        let tmpCrud = decodeGeneralData.find((element1) => {
            return element1.id === CRUD_ID && element.editValue === element1.value;
        });

        if (tmpCrud) {
            element.editType = tmpCrud.label;
        }

        //ユーザーの紐づけ
        let tmpUser = decodeUserFileData.find((element1) => {
            return element1.userId === element.userId;
        });

        if (tmpUser) {
            element.userName = tmpUser.userName;
        }

        //タスクの紐づけ
        let tmpTask = decodeTaskFileData.find((element1) => {
            return element1.id === element.taskId;
        });

        if (tmpTask) {
            element.taskTitle = tmpTask.title;
        }
    });

    return decodeFileData;
}

/**
 * タスクの作業履歴を取得
 */
export function getAddTaskHistoryObj(): addTaskHistoryType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_HISTORY_PATH);
    return JSON.parse(fileData);
}

/**
 * 履歴のメッセージを作成
 */
export function createHistoryMessage(decodeFileData: taskHistoryType[]) {

    //タスクステータスリスト
    let crudList = getGeneralDetailData(CRUD_ID);

    decodeFileData.forEach((element) => {

        element.historyMessage = `${element.editType}日時：${element.time}　ID：${element.taskId}　タイトル：${element.taskTitle}　
        作業内容：${element.editType}　　作業ユーザー：${element.userName}`;
    });

    return decodeFileData;
}