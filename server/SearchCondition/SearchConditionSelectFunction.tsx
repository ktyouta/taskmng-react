import { getGeneralDataList } from "../Common/Function";
import { readFile } from "../FileFunction";
import { getCustomAttributeData, getCustomAttributeListData } from "../SettingFunction/CustomAttribute/CustomAttributeSelectFunction";
import { customAttributeListType, customAttributeType } from "../SettingFunction/CustomAttribute/Type/CustomAttributeType";
import { comboType } from "../Type/type";
import { SEARCHCONDITION_FILE_PATH } from "./SearchConditionFunction";
import { retSearchConditionType, searchConditionType } from "./Type/SearchConditionType";


/**
 * 検索条件リストの読み込み
 */
export function getSearchConditionObj(): searchConditionType[] {
    //タスクファイルの読み込み
    let fileData = readFile(SEARCHCONDITION_FILE_PATH);

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