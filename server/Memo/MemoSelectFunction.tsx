import { memoListType } from "./Type/MemoType";
import { MEMO_FILEPATH } from "./Const/MemoConst";
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