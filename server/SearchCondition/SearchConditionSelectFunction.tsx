import { getGeneralDataList } from "../Common/Function";
import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../SettingFunction/CustomAttribute/CustomAttributeSelectFunction";
import { comboType, customAttributeListType, customAttributeType, generalDetailType } from "../Type/type";
import { SEARCHCONDITION_FILE_PATH } from "./SearchConditionFunction";
import { retSearchConditionType, searchConditionType } from "./Type/SearchConditionType";

/**
 * 検索条件リストの読み込み
 */
export function getSearchConditionList(): searchConditionType[] {
    //タスクファイルの読み込み
    let fileData = readFile(SEARCHCONDITION_FILE_PATH);
    return JSON.parse(fileData);
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
 * 検索条件の属性で絞り込む
 */
export function joinSelectListSearchCondition(searchConditionList: searchConditionType[]) {

    //汎用詳細ファイルの読み込み
    let generalDatas = getGeneralDataList();
    //カスタム属性の読み込み
    let customAttributeList: customAttributeType[] = getCustomAttributeData();
    //カスタム属性リストファイルの読み込み
    let customAttributeSelectList: customAttributeListType[] = getCustomAttributeListData();

    let retSearchConditionList: retSearchConditionType[] = searchConditionList.map((element) => {

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

            //検索条件の属性がカスタム属性の場合
            if (customAttribute) {
                let tmpCustomAttributeSelectList = customAttributeSelectList.filter((element1) => {
                    return element1.id === customAttribute?.selectElementListId;
                });
                selectList = tmpCustomAttributeSelectList.map((element1) => {
                    return {
                        label: element1.content,
                        value: element1.no,
                    }
                });
            }
        }

        return {
            ...element,
            selectList: selectList
        }
    });

    return retSearchConditionList;
}