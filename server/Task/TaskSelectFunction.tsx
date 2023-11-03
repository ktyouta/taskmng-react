import { authenticate } from "../AuthFunction";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "../Constant";
import { overWriteData, readFile } from "../FileFunction";
import { getGeneralDetailData } from "../GeneralFunction";
import { checkUpdAuth } from "../MasterDataFunction";
import { authInfoType, customAttributeType, searchConditionType, taskListType } from "../Type/type";
import { getNowDate } from "../CommonFunction";
import { getCustomAttributeList } from "../SettingFunction/CustomAttribute/CustomAttributeSelectFunction";

//タスクファイルのパス
const TASK_FILEPATH = `${TRANSACTION}${TASKFILENM}${JSONEXTENSION}`;
//タスクIDの接頭辞
const PRE_TASK_ID = `TASKID-`;

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
 * タスクをカスタム属性と結合
 */
export function joinCustomAttribute() {

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getCustomAttributeList();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0 ||
        decodeFileData.filter((element) => element.deleteFlg === "0").length === 0) {
        return;
    }

}