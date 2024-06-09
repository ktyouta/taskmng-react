import { getFilterdCategory } from "../Setting/Category/CategorySelectFunction";
import { categoryType } from "../Setting/Category/Type/CategoryType";
import { TASK_FILEPATH } from "../Task/Const/TaskConst";
import { addTaskHistoryType, taskHistoryType } from "./Type/HistoryType";
import ENV from '../../src/env.json';
import { taskListType } from "../Task/Type/TaskType";
import { userInfoType } from "../Setting/User/Type/UserType";
import { TASK_HISTORY_PATH } from "./Const/HistoryConst";
import { USERINFO_FILEPATH } from "../Setting/User/Const/UserConst";
import { CRUD_ID, TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { readFile } from "../Common/FileFunction";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";




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
    let userFileData = readFile(USERINFO_FILEPATH);
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

    //日付で降順ソート
    decodeFileData.sort((a, b) => {
        if (a.time > b.time) {
            return -1;
        }
        else {
            return 1;
        }
    })

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
    // let crudList = getGeneralDetailData(CRUD_ID);

    // decodeFileData.forEach((element) => {

    //     element.historyMessage = `${element.editType}日時：${element.time}　ID：${element.taskId}　タイトル：${element.taskTitle}　
    //     作業内容：${element.editType}　　作業ユーザー：${element.userName}`;
    // });

    return decodeFileData;
}


/**
 * タスクのURLを作成
 */
export function createTaskUrl(decodeFileData: taskHistoryType[]) {

    //カテゴリの読み込み
    let categoryLists: categoryType[] = getFilterdCategory();

    //タスクのメニューデータを取得
    let taskCategoryData = categoryLists.find((element) => {
        return element.id === TASK_CATEGORY_ID;
    });

    //タスクのカテゴリが存在しない
    if (!taskCategoryData) {
        return decodeFileData;
    }

    //タスクのURLを作成
    decodeFileData.forEach((element) => {
        element.url = taskCategoryData ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.LOCALPORT}${taskCategoryData?.path}/${element.taskId}` : "";
    });

    return decodeFileData;
}

/**
 * 履歴のIDを作成
 */
export function createTaskHistoryNewId(decodeFileData: addTaskHistoryType[]) {
    //IDが最大のNOを取得
    let maxNo = decodeFileData.reduce<number>((prev: number, current: addTaskHistoryType) => {
        let currentNm = parseInt(current.id);
        return Math.max(prev, currentNm);
    }, 0);
    return `${maxNo + 1}`;
}