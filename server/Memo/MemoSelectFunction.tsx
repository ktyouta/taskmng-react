import { memoContentListType, memoInputSettingListType, memoListType, memoSearchConditionListType } from "./Type/MemoType";
import { MEMO_CONTENT_FILEPATH, MEMO_FILEPATH, MEMO_INPUTSETTING_FILEPATH, MEMO_SEARCHCONDITION_FILEPATH } from "./Const/MemoConst";
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
 * メモ入力設定ファイルからオブジェクトを取得
 */
export function getMemoInputSettingObj(): memoInputSettingListType[] {
    //メモ入力設定ファイルの読み込み
    let fileData = readFile(MEMO_INPUTSETTING_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * 削除データをフィルターする
 */
export function getFilterdMemoInputSetting() {
    //メモ入力設定ファイルの読み込み
    let decodeFileData: memoInputSettingListType[] = getMemoInputSettingObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}