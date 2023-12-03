import { GENERALDETAILFILEPATH, JSONEXTENSION, MASTERFILEPATH, SETTINGFILEPATH, TASKHISTORYPATH, TRANSACTION, USERINFOFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { generalDetailType, userInfoType } from "../Type/type";
import { taskHistoryType } from "./Type/HistoryType";


//タスクの作業履歴ファイルのパス
const TASK_HISTORY_PATH = `${TRANSACTION}${TASKHISTORYPATH}${JSONEXTENSION}`;
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
    let generalData = readFile(GENERAL_DETAIL_FILEPATH);
    let decodeGeneralData: generalDetailType[] = JSON.parse(generalData);

    //ユーザーファイルの読み込み
    let userFileData = readFile(USER_INFO_FILEPATH);
    let decodeUserFileData: userInfoType[] = JSON.parse(userFileData);

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

    });

    return decodeFileData;
}