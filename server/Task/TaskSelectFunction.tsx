import { getGeneralDetailData } from "../General/GeneralFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../Setting/CustomAttribute/CustomAttributeSelectFunction";
import { joinGeneralSetting } from "../History/HistorySelectFunction";
import { getFilterdSearchConditionList, getSearchConditionList } from "../SearchCondition/SearchConditionSelectFunction";
import { searchConditionType } from "../SearchCondition/Type/SearchConditionType";
import { CUSTOMATTRIBUTESELECTVALUE_FILE_PATH, CUSTOMATTRIBUTE_KEY_DEFAULT, PRE_TASK_ID, SEARCHCONDITION_KEY_DEFAULT, TASK_CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH, TASK_FILEPATH } from "./Const/TaskConst";
import { categoryType } from "../Setting/Category/Type/CategoryType";
import { getFilterdCategory } from "../Setting/Category/CategorySelectFunction";
import ENV from '../../src/env.json';
import { taskCustomAttributeSelectType, taskCustomAttributeSelectedType, taskListType } from "./Type/TaskType";
import { customAttributeListType, customAttributeType } from "../Setting/CustomAttribute/Type/CustomAttributeType";
import { TASK_CATEGORY_ID } from "../Common/Const.tsx/CommonConst";
import { comboType, inputSettingType } from "../Common/Type/CommonType";
import { getFileJsonData, readFile } from "../Common/FileFunction";



/**
 * タスクファイルからオブジェクトを取得
 */
export function getTaskObj(): taskListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * 削除データをフィルターする
 */
export function getFilterdTask() {
    //タスクファイルの読み込み
    let decodeFileData: taskListType[] = getTaskObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * タスクリストをクエリストリングで絞り込む
 */
export function filterDefaultAttribute(decodeFileData: taskListType[], query: any) {

    //タスク用の検索条件設定リストを取得
    let searchConditionList: searchConditionType[] = getSearchConditionList();
    let taskConditionList: searchConditionType[] = getFilterdSearchConditionList(searchConditionList, SEARCHCONDITION_KEY_DEFAULT);

    //検索条件で絞り込み
    taskConditionList.forEach((element) => {
        let value = query[element.id] as string;
        if (!value) {
            return;
        }
        decodeFileData = decodeFileData.filter((item) => {
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
        decodeFileData = decodeFileData.filter((element) => {
            return element.title.includes(keyword) || element.content.includes(keyword);
        });
    }

    //取得件数で絞り込み
    let getNum = query.num as number;
    if (getNum && !isNaN(Number(getNum))) {
        decodeFileData = decodeFileData.slice(0, getNum);
    }
    return decodeFileData;
}


/**
 * タスクリストをカスタム属性のクエリストリングで絞り込む
 */
export function filterCustomAttribute(taskList: taskListType[], query: any) {

    //タスク用の検索条件設定リストを取得
    let searchConditionList: searchConditionType[] = getSearchConditionList();
    let customAttributeConditionList: searchConditionType[] = getFilterdSearchConditionList(searchConditionList, CUSTOMATTRIBUTE_KEY_DEFAULT);

    //カスタム属性の選択値リスト
    let taskCustomAttributeList = getCustomAttributeTaskObj();

    customAttributeConditionList.forEach((element) => {
        let customAttributeId = element.id;
        //クエリストリングの値を取得
        let value = query[customAttributeId] as string;

        //クエリストリングにセットされていないキーはチェックしない
        if (!value) {
            return;
        }

        taskList = taskList.filter((element1) => {
            //カスタム属性の選択値リストから、カスタム属性IDとタスクIDの一致するデータを取得
            let taskIdMatchingCustomDatas = taskCustomAttributeList.find((element2) => {
                return element2.customAttributeId === customAttributeId && element2.taskId === element1.id;
            });

            //カスタム属性の選択値リストに登録されていないタスクを省く
            if (!taskIdMatchingCustomDatas) {
                return false;
            }

            //クエリストリングと選択値のチェック
            //複数選択項目の場合
            if (element.type === "checkbox") {
                return value.split(",").includes(taskIdMatchingCustomDatas.selectedValue);
            }

            return taskIdMatchingCustomDatas.selectedValue.includes(value);
        });
    });

    return taskList;
}


/**
 * カスタム属性の選択値リストを取得
 */
function getTaskCustomAttributeSelectedData() {
    //カスタム属性の選択値リストの読み込み
    let customAttributeSelectedList: taskCustomAttributeSelectedType[] = getFileJsonData(TASK_CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    //削除済のデータをフィルターする
    customAttributeSelectedList = customAttributeSelectedList.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return customAttributeSelectedList;
}

/**
 * 対象タスクのカスタム属性の選択値を返却
 * @param singleTaskData タスクの詳細データ
 * @returns 
 */
export function joinCustomAttribute(singleTaskData: taskListType) {

    //画面に返すカスタム属性の値
    let retCustomAttributeList: inputSettingType[] = [];

    //カスタム属性の読み込み
    let customAttributeData: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!customAttributeData || customAttributeData.length === 0) {
        return retCustomAttributeList;
    }

    //カスタム属性の選択リストの読み込み
    let customAttributeListData: customAttributeListType[] = getCustomAttributeListData();

    //データなし
    if (!customAttributeListData || customAttributeListData.length === 0) {
        return retCustomAttributeList;
    }

    //タスクのカスタム属性の入力値リストの読み込み
    let customAttributeInputList: taskCustomAttributeSelectedType[] = getTaskCustomAttributeSelectedData();

    //データなし
    if (!customAttributeInputList || customAttributeInputList.length === 0) {
        return retCustomAttributeList;
    }

    //タスクID
    let taskId = singleTaskData.id;

    //入力値のリストをタスクIDで絞り込む
    customAttributeInputList = customAttributeInputList.filter((element) => {
        return element.taskId === taskId;
    });

    //データなし
    if (!customAttributeInputList || customAttributeInputList.length === 0) {
        return retCustomAttributeList;
    }

    //選択値をセットする
    customAttributeInputList.forEach((element) => {
        //IDから取得
        let tmpCa = customAttributeData.find((element1) => element1.id === element.customAttributeId);

        if (!tmpCa) {
            return;
        }

        //選択リスト
        let tmpCAList = customAttributeListData.filter((element1) => element1.id === tmpCa?.selectElementListId);
        let tmpList: comboType[] = [];
        tmpCAList.map((element1) => {
            tmpList.push({
                label: element1.content,
                value: element1.no,
            });
        });

        retCustomAttributeList.push({
            id: tmpCa.id,
            name: tmpCa.name,
            type: tmpCa.type,
            selectList: tmpList,
            length: tmpCa.length,
            disabled: false,
            visible: true,
            value: element.selectedValue
        });
    });

    return retCustomAttributeList;
}

/**
 * カスタム属性の選択値ファイルからオブジェクトを取得
 */
export function getCustomAttributeTaskObj(): taskCustomAttributeSelectType[] {
    //タスクファイルの読み込み
    let fileData = readFile(CUSTOMATTRIBUTESELECTVALUE_FILE_PATH);
    return JSON.parse(fileData);
}


/**
 * タスクのIDを作成
 */
export function createTaskNewId(taskList: taskListType[]) {
    //IDが最大のNOを取得
    let maxNo = taskList.reduce<number>((prev: number, current: taskListType) => {
        let currentNm = parseInt(current.id.replace(`${PRE_TASK_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_TASK_ID}${maxNo + 1}`;
}


/**
 * タスクのURLを作成
 */
export function createTaskDetailUrl(taskData: taskListType) {

    //カテゴリの読み込み
    let categoryLists: categoryType[] = getFilterdCategory();

    //タスクのメニューデータを取得
    let taskCategoryData = categoryLists.find((element) => {
        return element.id === TASK_CATEGORY_ID;
    });

    //タスクのカテゴリが存在しない
    if (!taskCategoryData) {
        return taskData;
    }

    //タスクのURLを作成
    taskData.url = taskCategoryData ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.LOCALPORT}${taskCategoryData?.path}/${taskData.id}` : "";

    return taskData;
}