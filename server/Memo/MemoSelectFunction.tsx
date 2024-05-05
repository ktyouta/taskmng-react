import { memoContentListType, memoListResType, memoListType, memoSearchConditionListType } from "./Type/MemoType";
import { MEMO_CONTENT_FILEPATH, MEMO_FILEPATH, MEMO_INPUTSETTING_FILEPATH, MEMO_SEARCHCONDITION_FILEPATH, MEMO_STATUS, PRE_MEMO_ID, PRE_TAG_ID, TAG_PROPERTY, USER_SEARCHCONDITION_ID } from "./Const/MemoConst";
import { getFileJsonData, readFile } from "../Common/FileFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";
import { GENERALDETAIL_FILEPATH } from "../Setting/DefaultAttribute/Const/DefaultAttributeConst";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";
import { comboType, tagType } from "../Common/Type/CommonType";
import { getFormatDate } from "../Common/Function";
import { TAGFILENM } from "../Common/Const/CommonConst";
import { tagListType } from "../Tag/Type/TagType";
import { TAG_FILEPATH } from "../Tag/Const/TagConst";
import { userInfoType } from "../Setting/User/Type/UserType";



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
    //メメモファイルの読み込み
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
        return convMemoDetail(element);
    });

    return convMemoList;
}

/**
 * メモリストを画面返却用の型に変換
 */
export function convMemoDetail(decodeFileData: memoListType): memoListResType {

    //画面返却用の型に変換
    return (
        { ...decodeFileData, userNm: "", tagList: [] }
    );
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
export function filterMemoQuery(resMemoList: memoListResType[], query: any,
    decodeTagFileData: tagListType[]): memoListResType[] {

    //メモ用の検索条件設定リストを取得
    let searchConditionList: memoSearchConditionListType[] = getMemoSearchConditionObj();

    //検索条件で絞り込み
    searchConditionList.forEach((element) => {
        //検索条件設定のIDからクエリストリングの値を取得する
        let value = query[element.id] as string;
        if (!value) {
            return;
        }

        resMemoList = resMemoList.filter((item) => {
            //メモリストのプロパティに存在しない場合はフィルターしない
            if (!(element.id in item)) {
                return true;
            }

            let memoValue = item[element.id];

            if (typeof memoValue !== "string") {
                return true;
            }

            //複数選択項目の場合
            if (element.type === "checkbox") {
                return value.split(",").includes(memoValue);
            }

            //dateの場合
            if (element.type === "date") {
                value = getFormatDate(value);
            }

            return memoValue.includes(value);
        });
    });

    //キーワードで絞り込み
    let keyword = query.keyword as string;
    if (keyword) {
        resMemoList = resMemoList.filter((element) => {
            return element.title.includes(keyword) || element.content.includes(keyword);
        });
    }

    //タグで絞り込み
    let tag = query.tag as string;
    if (tag) {
        //クエリストリングのラベルリストからIDリストを作成
        let queryTagList = tag.split(",");
        let queryTagIdList: string[] = queryTagList.reduce((prev: string[], current) => {
            let queryTag = decodeTagFileData.find((element1) => {
                return element1.label === current;
            });
            if (!queryTag) {
                return prev;
            }

            return [...prev, queryTag.id];
        }, []);

        resMemoList = resMemoList.filter((element) => {
            let memoTagList = element.tagId;

            if (!memoTagList) {
                return false;
            }

            return queryTagIdList.some((element1) => {
                return memoTagList.includes(element1);
            });
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
 * ユーザーリストと結合
 */
export function joinSelectListMemoSearchCondition(searchConditionList: memoSearchConditionListType[],
    userList: userInfoType[]
): memoSearchConditionListType[] {

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


/**
 * タグラベルと結合
 */
export function joinTagLabelMemoSearchCondition(searchConditionList: memoSearchConditionListType[],
    decodeTagFileData: tagListType[]
): memoSearchConditionListType[] {

    //タグプロパティの要素を取得
    let tagProperty = searchConditionList.find((element) => {
        return element.id === TAG_PROPERTY;
    });

    if (!tagProperty) {
        return searchConditionList;
    }

    //タグの初期値(ID)
    let tagIdValue = tagProperty.value;

    if (!tagIdValue) {
        return searchConditionList;
    }

    //タグラベルを初期値としてセット
    tagProperty.value = tagIdValue.split(",").reduce((prev: string[], current: string) => {
        let tagLabel = decodeTagFileData.find((element) => {
            return element.id === current;
        })?.label;
        if (!tagLabel) {
            return prev;
        }

        return [...prev, tagLabel]
    }, []).join(",");

    return searchConditionList;
}


/**
 * タグのIDを作成
 */
export function createTagNewId(tagList: tagListType[]) {
    //IDが最大のNOを取得
    let maxNo = tagList.reduce<number>((prev: number, current: tagListType) => {
        let id = current.id;
        if (!id) {
            id = "1";
        }
        let currentNm = parseInt(current.id.replace(`${PRE_TAG_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_TAG_ID}${maxNo + 1}`;
}


/**
 * タグリストと結合
 */
export function joinMemoTag(resMemoList: memoListResType[], decodeFileData: tagListType[]): memoListResType[] {

    resMemoList.forEach((element) => {

        joinMemoDetailTag(element, decodeFileData);
    });

    return resMemoList;
}


/**
 * メモ詳細とタグリストと結合
 */
export function joinMemoDetailTag(resMemoList: memoListResType, decodeFileData: tagListType[]): memoListResType {

    if (!resMemoList.tagId) {
        return resMemoList;
    }
    let tagIdList = resMemoList.tagId.split(",");

    //タグが未設定
    if (!tagIdList || tagIdList.length === 0) {
        return resMemoList;
    }

    resMemoList.tagList = tagIdList.reduce((prev: tagType[], current) => {
        let tagObj = decodeFileData.find((element) => {
            return current === element.id;
        });

        if (!tagObj) {
            return prev;
        }

        prev.push({
            label: tagObj.label,
            value: tagObj.id,
        });

        return prev;
    }, [])
    return resMemoList;
}