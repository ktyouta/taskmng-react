import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { readFile } from "../../Common/FileFunction";
import { checkAuthAction } from "../../Common/Function";
import { comboType } from "../../Common/Type/CommonType";
import { getGeneralDataList } from "../../General/GeneralSelectFunction";
import { USER_SEARCHCONDITION_ID } from "../../Memo/Const/MemoConst";
import { getCustomAttributeData, getCustomAttributeListData } from "../CustomAttribute/CustomAttributeSelectFunction";
import { customAttributeListType, customAttributeType } from "../CustomAttribute/Type/CustomAttributeType";
import { userInfoType } from "../User/Type/UserType";
import { getUserInfoData } from "../User/UserSelectFunction";
import { SEARCHCONDITION_FILE_PATH, TASK_PRIVATE_SEARCHCONDITION_FILE_PATH } from "./Const/SearchConditionConst";
import { retSearchConditionType, searchConditionType, taskPrivateSearchConditionType } from "./Type/SearchConditionType";


/**
 * 検索条件リストの読み込み
 */
export function getSearchConditionObj(): searchConditionType[] {
    //タスク検索条件ファイルの読み込み
    let fileData = readFile(SEARCHCONDITION_FILE_PATH);

    return JSON.parse(fileData);
}


/**
 * 検索条件リストの読み込み
 */
export function getPrivateSearchConditionObj(): searchConditionType[] {
    //ユーザー毎のタスク検索条件ファイルの読み込み
    let fileData = readFile(TASK_PRIVATE_SEARCHCONDITION_FILE_PATH);

    return JSON.parse(fileData);
}


/**
 * 画面表示用検索条件リストの読み込み
 */
export function getSearchConditionList(): searchConditionType[] {
    let decodeFileData: searchConditionType[] = getSearchConditionObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * 検索条件の属性で絞り込む
 */
export function getFilterdSearchConditionList(searchConditionList: searchConditionType[], attribute: string) {

    searchConditionList = searchConditionList.filter((element) => {
        return element.attribute === attribute;
    });

    return searchConditionList;
}


/**
 * 選択リストを結合
 */
export function joinSelectListSearchCondition(searchConditionList: searchConditionType[]) {

    //汎用詳細ファイルの読み込み
    let generalDatas = getGeneralDataList();
    //カスタム属性の読み込み
    let customAttributeList: customAttributeType[] = getCustomAttributeData();
    //カスタム属性リストファイルの読み込み
    let customAttributeSelectList: customAttributeListType[] = getCustomAttributeListData();

    //選択リストと結合
    let retSearchConditionList: retSearchConditionType[] = searchConditionList.reduce((nowList: retSearchConditionType[],
        element: searchConditionType) => {

        let selectList: comboType[] = [];
        //選択リストを保持している
        if (element.listKey) {
            selectList = generalDatas.filter((element1) => {
                return element1.id === element.listKey;
            });
        }
        else {
            //カスタム属性を取得
            let customAttribute = customAttributeList.find((element1) => {
                return element1.id === element.id;
            });

            //検索条件の属性がカスタム属性で選択リストを保持している場合
            if (customAttribute && customAttribute.selectElementListId) {
                let tmpCustomAttributeSelectList = customAttributeSelectList.filter((element1) => {
                    return element1.id === customAttribute?.selectElementListId && element1.deleteFlg !== "1";
                });
                selectList = tmpCustomAttributeSelectList.map((element1) => {
                    return {
                        label: element1.content,
                        value: element1.no,
                    }
                });

                //選択リストが存在しない場合は検索条件リストから除外する
                if (!selectList || selectList.length === 0) {
                    return nowList;
                }
            }
        }

        nowList.push({
            ...element,
            selectList: selectList
        });

        return nowList;
    }, []);

    return retSearchConditionList;
}


/**
 * クエリパラメータで検索条件を絞り込む
 */
export function filterdQueryParamSearchCondition(searchConditionList: searchConditionType[], queryStr: string) {

    let tmpSearchConditionList: searchConditionType[] = [];
    let retSearchConditionList: searchConditionType[] = queryStr ? [] : searchConditionList;

    //クエリストリングが設定されている場合は絞り込む
    if (queryStr && queryStr.split(",").length > 0) {
        let queryArr = queryStr.split(",");
        tmpSearchConditionList = JSON.parse(JSON.stringify(searchConditionList));

        //クエリストリングに一致する検索条件設定を取得して結合
        queryArr.forEach((element: string) => {
            let tmp = getFilterdSearchConditionList(tmpSearchConditionList, element);
            retSearchConditionList = [...retSearchConditionList, ...tmp];
        });
    }

    return retSearchConditionList;
}


/**
 * ユーザーの権限に応じて検索条件をフィルターする
 */
export function filterSearchConditionByUserAuth(searchConditionList: searchConditionType[],
    taskUseruth: string): searchConditionType[] {

    return searchConditionList.filter((element: searchConditionType) => {

        //権限チェック
        return checkAuthAction(taskUseruth, element.auth);
    });
}

/**
 * ユーザーリストと結合
 */
export function joinSelectListTaskSearchCondition(searchConditionList: retSearchConditionType[],
): retSearchConditionType[] {

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


/**
 * ユーザーの画面表示用検索条件リストの読み込み
 */
export function getPrivateSearchConditionList(): taskPrivateSearchConditionType[] {

    let decodeFileData: taskPrivateSearchConditionType[] = getPrivateSearchConditionObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * 対象ユーザーの検索条件を取得する
 */
export function getUserPrivateSearchConditionList(userId: string): taskPrivateSearchConditionType[] {

    let decodeFileData: taskPrivateSearchConditionType[] = getPrivateSearchConditionList();

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
export function joinSearchCondition(searchCondtionMasterList: searchConditionType[],
    searchConditionPrivateList: taskPrivateSearchConditionType[]
): searchConditionType[] {

    let retSearchConditionList: searchConditionType[] = searchCondtionMasterList.map((element: searchConditionType) => {

        let value = element.value;

        //ユーザー毎のタスク検索条件を取得
        let searchConditionPrivateObj = searchConditionPrivateList.find((element1: taskPrivateSearchConditionType) => {

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
            auth: element.auth,
        }
    });

    return retSearchConditionList;
}