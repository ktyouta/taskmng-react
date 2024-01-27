import { JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { searchConditionType } from "../Type/type";

/**
 * 検索条件リストの読み込み
 */
export function getSearchConditionList(): searchConditionType[] {
    //タスクファイルの読み込み
    let fileData = readFile(`${SETTINGFILEPATH}${SEARCHCONDITIONFILEPATH}${JSONEXTENSION}`);
    return JSON.parse(fileData).task;
}

/**
 * クエリストリングで絞り込む
 */
export function getFilterdSearchConditionList(searchConditionList: searchConditionType[], attribute: string) {

    searchConditionList = searchConditionList.filter((element) => {
        return element.attribute === attribute;
    });

    return searchConditionList;
}