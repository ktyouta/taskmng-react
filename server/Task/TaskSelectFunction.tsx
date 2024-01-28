import { authenticate } from "../AuthFunction";
import { CUSTOMATTRIBUTESELECT, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { getFileJsonData, overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, comboType, customAttributeListType, customAttributeType, searchConditionType, inputSettingType, taskCustomAttributeSelectedType, taskListType, taskCustomAttributeSelectType } from "../Type/type";
import { getNowDate } from "../CommonFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../SettingFunction/CustomAttribute/CustomAttributeSelectFunction";
import { joinGeneralSetting } from "../History/HistorySelectFunction";
import { getFilterdSearchConditionList, getSearchConditionList } from "../SearchCondition/SearchConditionSelectFunction";

//タスクファイルのパス
export const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
export const TASK_CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTESELECT}${JSONEXTENSION}`;
//カスタム属性登録用ファイルのパス
const CUSTOMATTRIBUTESELECTVALUE_FILE_PATH = `${TRANSACTION}${CUSTOMATTRIBUTESELECT}${JSONEXTENSION}`;
//デフォルト属性用の検索条件取得キー
const SEARCHCONDITION_KEY_DEFAULT = "default";


/**
 * タスクファイルからオブジェクトを取得
 */
export function getTaskObj(): taskListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TASK_FILEPATH);
    return JSON.parse(fileData);
}

/**
 * タスクリストをクエリストリングで絞り込む
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
export function filterTask(decodeFileData: taskListType[], query: any) {

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
 * タスク用の検索条件を取得
 */
// function getTaskSearchConditionList() {
//     //タスクファイルの読み込み
//     let fileData = readFile(`${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`);
//     return JSON.parse(fileData).task;
// }

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
