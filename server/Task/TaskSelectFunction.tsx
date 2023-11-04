import { authenticate } from "../AuthFunction";
import { CUSTOMATTRIBUTESELECT, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { getFileJsonData, overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, comboType, customAttributeListType, customAttributeType, searchConditionType, taskCustomAttributeDispType, taskCustomAttributeSelectedType, taskListType } from "../Type/type";
import { getNowDate } from "../CommonFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../SettingFunction/CustomAttribute/CustomAttributeSelectFunction";

//タスクファイルのパス
const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
export const TASK_CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTESELECT}${JSONEXTENSION}`;


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
    let taskConditionList: searchConditionType[] = getTaskSearchConditionList();
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
function getTaskSearchConditionList() {
    //タスクファイルの読み込み
    let fileData = readFile(`${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`);
    return JSON.parse(fileData).task;
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
    let customAttributeList: taskCustomAttributeDispType[] = [];

    //カスタム属性の読み込み
    let customAttributeData: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!customAttributeData || customAttributeData.length === 0) {
        return customAttributeList;
    }

    //カスタム属性の選択リストの読み込み
    let customAttributeListData: customAttributeListType[] = getCustomAttributeListData();

    //データなし
    if (!customAttributeListData || customAttributeListData.length === 0) {
        return customAttributeList;
    }

    //カスタム属性の選択値リストの読み込み
    let customAttributeSelectedList: taskCustomAttributeSelectedType[] = getTaskCustomAttributeSelectedData();

    //データなし
    if (!customAttributeSelectedList || customAttributeSelectedList.length === 0) {
        return customAttributeList;
    }

    //タスクID
    let taskId = singleTaskData.id;

    //選択値のリストをタスクIDで絞り込む
    customAttributeSelectedList = customAttributeSelectedList.filter((element) => {
        return element.taskId === taskId;
    });

    //データなし
    if (!customAttributeSelectedList || customAttributeSelectedList.length === 0) {
        return customAttributeList;
    }

    //選択値をセットする
    customAttributeSelectedList.forEach((element) => {
        //名称
        let tmpCList = customAttributeData.find((element1) => element1.id === element.customAttributeId);
        //選択リスト
        let tmpCAList = customAttributeListData.filter((element1) => element1.id === element.customAttributeId);
        let tmpList: comboType[] = [];
        tmpCAList.map((element1) => {
            tmpList.push({
                label: element1.content,
                value: element1.no,
            });
        })

        customAttributeList.push({
            name: tmpCList?.name ?? "",
            value: element.selectedValue,
            list: tmpList,
            type: tmpCList?.format ?? ""
        });
    });

    return customAttributeList;
}