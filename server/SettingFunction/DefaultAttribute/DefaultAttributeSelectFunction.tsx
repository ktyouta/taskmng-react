import { authenticate } from "../../AuthFunction";
import {
    GENERALDETAILFILEPATH,
    JSONEXTENSION,
    MASTERFILEPATH,
    SETTINGFILEPATH,
    TASKINPUTSETTING,
    TRANSACTION,
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, comboType, generalDetailType, inputSettingType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";
import { DEFAULT_ATTRIBUTE_FILEPATH, GENERALDETAIL_FILEPATH } from "./DefaultAttributeFunction";
import { defaultAttributeType } from "./Type/DefaultAttributeType";



/**
 * デフォルト属性リストを取得
 */
export function getDefaultAttributeData() {

    //デフォルト属性の読み込み
    let decodeFileData: defaultAttributeType[] = getFileJsonData(DEFAULT_ATTRIBUTE_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * デフォルト属性のリストをIDで絞り込む
 * @param decodeFileData デフォルト属性リスト
 * @param id デフォルト属性ID
 * @param res 
 * @returns 
 */
export function filterDefaultAttributeDetail(decodeFileData: defaultAttributeType[], id: string, res: any)
    : any {

    let singleDefaultAttributeData = decodeFileData.find((element) => { return element.id === id });
    if (!singleDefaultAttributeData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //選択形式の場合はリストを取得する
    if (singleDefaultAttributeData.listKey) {
        //汎用詳細の読み込み
        let generalDatas: generalDetailType[] = getFileJsonData(GENERALDETAIL_FILEPATH);

        let listKey = singleDefaultAttributeData.listKey;
        let singleGeneralData = generalDatas.filter((element) => {
            return element.id === listKey;
        });
        singleDefaultAttributeData.selectElementList = singleGeneralData.map((element) => {
            return {
                value: element.value,
                label: element.label
            }
        });
    }

    return res.status(200).json(singleDefaultAttributeData);
}