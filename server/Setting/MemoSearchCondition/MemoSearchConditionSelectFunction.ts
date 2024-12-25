import { FLG } from "../../Common/Const/CommonConst";
import { readFile } from "../../Common/FileFunction";
import { MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH, MEMO_SEARCHCONDITION_FILEPATH } from "./Const/MemoSearchConditionConst";
import { memoPrivateSearchConditionType, memoSearchConditionListType } from "./Type/MemoSearchConditionType";

/**
 * メモ検索条件リスト(ユーザー単位)の読み込み
 */
export function getPrivateMemoSearchConditionObj(): memoPrivateSearchConditionType[] {

    //ユーザー毎のメモ検索条件ファイルの読み込み
    let fileData = readFile(MEMO_PRIVATE_SEARCHCONDITION_FILE_PATH);

    return JSON.parse(fileData);
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
export function getFilterdMemoSearchCondition() {
    //メモ検索条件ファイルの読み込み
    let decodeFileData: memoSearchConditionListType[] = getMemoSearchConditionObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * ユーザーの画面表示用メモ検索条件リストの読み込み
 */
export function getPrivateMemoSearchConditionList(): memoPrivateSearchConditionType[] {

    let decodeFileData: memoPrivateSearchConditionType[] = getPrivateMemoSearchConditionObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== FLG.ON;
    });

    return decodeFileData;
}


/**
 * 対象ユーザーのメモ検索条件を取得する
 */
export function getUserPrivateMemoSearchConditionList(userId: string): memoPrivateSearchConditionType[] {

    let decodeFileData: memoPrivateSearchConditionType[] = getPrivateMemoSearchConditionObj();

    //対象ユーザーでフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.userId === userId;
    });

    return decodeFileData;
}


/**
 * 検索条件マスタとユーザーの検索条件設定を結合する
 * @param searchCondtionMasterList 
 * @param searchConditionPrivateList 
 * @returns 
 */
export function joinMemoSearchCondition(searchCondtionMasterList: memoSearchConditionListType[],
    searchConditionPrivateList: memoPrivateSearchConditionType[]
): memoSearchConditionListType[] {

    let retSearchConditionList: memoSearchConditionListType[] = searchCondtionMasterList.map((element: memoSearchConditionListType) => {

        let value = element.value;

        //ユーザー毎のメモ検索条件を取得
        let searchConditionPrivateObj = searchConditionPrivateList.find((element1: memoPrivateSearchConditionType) => {

            return element1.id === element.id;
        });

        //ユーザーの検索条件が存在する場合
        if (searchConditionPrivateObj) {
            value = searchConditionPrivateObj.value;
        }

        return {
            id: element.id,
            name: element.name,
            type: element.type,
            listKey: element.listKey,
            value: value,
            attribute: element.attribute,
            registerTime: element.registerTime,
            updTime: element.updTime,
            deleteFlg: element.deleteFlg,
            userId: element.userId,
            isHidden: element.isHidden,
            description: element.description,
            selectList: element.selectList,
        }
    });

    return retSearchConditionList;
}