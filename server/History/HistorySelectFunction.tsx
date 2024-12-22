import { getFilterdCategory } from "../Setting/Category/CategorySelectFunction";
import { categoryType } from "../Setting/Category/Type/CategoryType";
import { TASK_FILEPATH } from "../Task/Const/TaskConst";
import { addTaskHistoryType, taskHistoryType } from "./Type/HistoryType";
import ENV from '../../src/env.json';
import { taskListType } from "../Task/Type/TaskType";
import { TASK_HISTORY_PATH } from "./Const/HistoryConst";
import { CRUD_ID, TASK_CATEGORY_ID } from "../Common/Const/CommonConst";
import { readFile } from "../Common/FileFunction";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";
import { userInfoType } from "../Setting/SettingUser/Type/SettingUserType";




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
 * 別ファイルのデータと紐づける
 */
export function joinGeneralSetting(decodeFileData: taskHistoryType[], decodeTaskFileData: taskListType[],
    decodeGeneralData: generalDetailType[], decodeUserFileData: userInfoType[]
): taskHistoryType[] {

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
            element.iconUrl = tmpUser.iconUrl;
        }

        //タスクの紐づけ
        let tmpTask = decodeTaskFileData.find((element1) => {
            return element1.id === element.taskId;
        });

        if (tmpTask) {
            element.taskTitle = tmpTask.title;
            element.priority = tmpTask.priority;
            element.status = tmpTask.status;
            element.taskDelFlg = tmpTask.deleteFlg;
        }
    });

    //日付/CRUDで降順ソート
    decodeFileData.sort((a, b) => {
        // 日付でソート
        const dateComparison = b.time.localeCompare(a.time);
        if (dateComparison !== 0) {
            return dateComparison;
        }

        // 日付が同じ場合、editValueでソート
        return b.editValue.localeCompare(a.editValue);
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