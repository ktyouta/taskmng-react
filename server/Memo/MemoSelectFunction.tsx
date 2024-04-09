import { memoContentListType, memoListResType, memoListType, memoSearchConditionListType } from "./Type/MemoType";
import { MEMO_CONTENT_FILEPATH, MEMO_FILEPATH, MEMO_INPUTSETTING_FILEPATH, MEMO_SEARCHCONDITION_FILEPATH, MEMO_STATUS, PRE_MEMO_ID, USER_SEARCHCONDITION_ID } from "./Const/MemoConst";
import { getFileJsonData, readFile } from "../Common/FileFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";
import { GENERALDETAIL_FILEPATH } from "../Setting/DefaultAttribute/Const/DefaultAttributeConst";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";
import { comboType } from "../Common/Type/CommonType";



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


/**
 * メモリストをクエリストリングで絞り込む
 */
export function filterMemoQuery(resMemoList: memoListResType[], query: any): memoListResType[] {

    //メモ用の検索条件設定リストを取得
    let searchConditionList: memoSearchConditionListType[] = getMemoSearchConditionObj();

    //検索条件で絞り込み
    searchConditionList.forEach((element) => {
        let value = query[element.id] as string;
        if (!value) {
            return;
        }
        resMemoList = resMemoList.filter((item) => {
            if (!(element.id in item)) {
                return true;
            }
            //複数選択項目の場合
            if (element.type === "checkbox") {
                return value.split(",").includes(item[element.id]);
            }
            return item[element.id].includes(value);
        });
    });

    //キーワードで絞り込み
    let keyword = query.keyword as string;
    if (keyword) {
        resMemoList = resMemoList.filter((element) => {
            return element.title.includes(keyword) || element.content.includes(keyword);
        });
    }

    //取得件数で絞り込み
    let getNum = query.num as number;
    if (getNum && !isNaN(Number(getNum))) {
        resMemoList = resMemoList.slice(0, getNum);
    }

    return resMemoList;
}


/**
 * 選択リストを結合
 */
export function joinSelectListMemoSearchCondition(searchConditionList: memoSearchConditionListType[]): memoSearchConditionListType[] {

    //ユーザーリストの読み込み
    let userList = getUserInfoData();

    //ユーザープロパティの要素を取得
    let userProperty = searchConditionList.find((element) => {
        return element.id === USER_SEARCHCONDITION_ID;
    });

    if (!userProperty) {
        return searchConditionList;
    }

    //ユーザーリストと結合
    let selectList: comboType[] = userList.map((element) => {
        return {
            label: element.userName,
            value: element.userId,
        }
    });

    //ユーザーリストをセット
    userProperty.selectList = selectList;

    return searchConditionList;
}