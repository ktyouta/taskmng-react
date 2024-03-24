import { memoContentListType, memoListType, memoSearchConditionListType } from "./Type/MemoType";
import { MEMO_CONTENT_FILEPATH, MEMO_FILEPATH, MEMO_INPUTSETTING_FILEPATH, MEMO_SEARCHCONDITION_FILEPATH, PRE_MEMO_ID } from "./Const/MemoConst";
import { readFile } from "../Common/FileFunction";



/**
 * メモファイルからオブジェクトを取得
 */
export function getMemoObj(): memoListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(MEMO_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * 削除データをフィルターする
 */
export function getFilterdMemo() {
    //タスクファイルの読み込み
    let decodeFileData: memoListType[] = getMemoObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * メモ検索条件ファイルからオブジェクトを取得
 */
export function getMemoSearchConditionObj(): memoSearchConditionListType[] {
    //メモ検索条件ファイルの読み込み
    let fileData = readFile(MEMO_SEARCHCONDITION_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * 削除データをフィルターする
 */
export function getFilterdSearchCondition() {
    //メモ検索条件ファイルの読み込み
    let decodeFileData: memoSearchConditionListType[] = getMemoSearchConditionObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * メモコンテンツ設定ファイルからオブジェクトを取得
 */
export function getMemoContentObj(): memoContentListType[] {
    //メモコンテンツファイルの読み込み
    let fileData = readFile(MEMO_CONTENT_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * 削除データをフィルターする
 */
export function getFilterdMemoContent() {
    //メモコンテンツファイルの読み込み
    let decodeFileData: memoContentListType[] = getMemoContentObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * メモのIDを作成
 */
export function createMemoNewId(taskList: memoListType[]) {
    //IDが最大のNOを取得
    let maxNo = taskList.reduce<number>((prev: number, current: memoListType) => {
        let currentNm = parseInt(current.id.replace(`${PRE_MEMO_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_MEMO_ID}${maxNo + 1}`;
}