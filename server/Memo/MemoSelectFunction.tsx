import { memoContentListType, memoListResType, memoListType, memoSearchConditionListType } from "./Type/MemoType";
import { MEMO_CONTENT_FILEPATH, MEMO_FILEPATH, MEMO_INPUTSETTING_FILEPATH, MEMO_SEARCHCONDITION_FILEPATH, MEMO_STATUS, PRE_MEMO_ID } from "./Const/MemoConst";
import { readFile } from "../Common/FileFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";



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


/**
 * ユーザーと下書きでフィルター
 */
export function getFilterdUserStatusMemo(decodeFileData: memoListResType[], authResult: authInfoType) {

    decodeFileData = decodeFileData.filter((element) => {

        //ユーザーIDが不一致かつ下書きのデータは省く
        return !(element.userId !== authResult.userInfo?.userId && element.status === MEMO_STATUS.draft);
    });

    return decodeFileData;
}


/**
 * メモリストを画面返却用の型に変換
 */
export function convMemo(decodeFileData: memoListType[]): memoListResType[] {

    //画面返却用の型に変換
    let convMemoList: memoListResType[] = decodeFileData.map((element) => {
        return (
            { ...element, userNm: "" }
        );
    });

    return convMemoList;
}


/**
 * ユーザーリストと結合
 */
export function joinUser(decodeFileData: memoListResType[]): memoListResType[] {

    //ユーザーリストを取得
    let userList = getUserInfoData();

    decodeFileData.forEach((element) => {
        let userNm = userList.find((element1) => {
            return element1.userId === element.userId;
        })?.userName;

        element.userNm = userNm ?? "";
    });

    return decodeFileData;
}