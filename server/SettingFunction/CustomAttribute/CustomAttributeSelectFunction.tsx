import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, customAttributeListType, customAttributeType, searchConditionType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";


//カスタム属性リストファイルのパス
const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;


/**
 * カスタム属性のリストをIDで絞り込む
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function getCustomAttributeDetail(decodeFileData: customAttributeType[], id: string, res: any)
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

        singleCustomAttributeData.selectElementList = filterdCalDate
    }

    return res.status(200).json(singleCustomAttributeData);
}