import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, comboType, customAttributeListType, customAttributeType, inputSettingType, searchConditionType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";
import { CUSTOM_ATTRIBUTE_FILEPATH } from "./CustomAttributeFunction";


//カスタム属性リストファイルのパス
const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;


/**
 * カスタム属性リストを取得
 */
export function getCustomAttributeData() {

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * カスタム属性選択リストを取得
 */
export function getCustomAttributeListData() {

    //カスタム属性リストファイルの読み込み
    let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);

    //削除済のデータをフィルターする
    calDecodeFileData = calDecodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return calDecodeFileData;
}

/**
 * カスタム属性のリストをIDで絞り込む
 * @param decodeFileData カスタム属性リスト
 * @param id カスタム属性ID
 * @param res 
 * @returns 
 */
export function filterCustomAttributeDetail(decodeFileData: customAttributeType[], id: string, res: any)
    : any {

    let singleCustomAttributeData = decodeFileData.find((element) => { return element.id === id });
    if (!singleCustomAttributeData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //選択リストを所持している場合は結合する
    if (singleCustomAttributeData.selectElementListId) {
        //カスタム属性リストファイルの読み込み
        let calDecodeFileData: customAttributeListType[] = getFileJsonData(CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH);
        //選択リストのIDで絞り込み
        let filterdCalDate = calDecodeFileData
            .filter((element) => {
                return element.id === singleCustomAttributeData?.selectElementListId && element.deleteFlg !== "1"
            })
            .map((element) => { return element.content });

        singleCustomAttributeData.selectElementList = filterdCalDate;
    }

    return res.status(200).json(singleCustomAttributeData);
}

/**
 * カスタム属性のリストをIDで絞り込む
 * @param decodeFileData カスタム属性リスト
 * @param id カスタム属性ID
 * @param res 
 * @returns 
 */
export function joinCustomAttributeList(customAttributeList: customAttributeType[], customAttributeSelectList: customAttributeListType[])
    : any {

    let retCustomAttributeList: inputSettingType[] = [];

    customAttributeList.forEach((element) => {

        //カスタム属性のIDからリストを取得
        let tmpSelectList: comboType[] = [];

        customAttributeSelectList.filter((element1) => {
            return element1.id === element.selectElementListId;
        }).forEach((element2) => {
            tmpSelectList.push({
                label: element2.content,
                value: element2.no,
            });
        });

        retCustomAttributeList.push({
            id: element.id,
            name: element.name,
            type: element.type,
            length: 0,
            disabled: false,
            visible: true,
            value: "",
            selectList: tmpSelectList,
            description: element.description,
            isRequired: element.required,
        });
    });

    return retCustomAttributeList;
}