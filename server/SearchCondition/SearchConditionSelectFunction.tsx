import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { SEARCHCONDITION_FILE_PATH } from "./SearchConditionFunction";
import { searchConditionType } from "./Type/SearchConditionType";

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