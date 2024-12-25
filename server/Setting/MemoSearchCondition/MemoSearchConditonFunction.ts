import { readFile } from "../../Common/FileFunction";
import { MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH } from "./Const/MemoSearchConditionConst";
import { memoPrivateSearchConditionType } from "./Type/MemoSearchConditionType";

/**
 * メモ検索条件リスト(ユーザー単位)の読み込み
 */
export function getPrivateMemoSearchConditionObj(): memoPrivateSearchConditionType[] {
    //ユーザー毎のメモ検索条件ファイルの読み込み
    let fileData = readFile(MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH);

    return JSON.parse(fileData);
}