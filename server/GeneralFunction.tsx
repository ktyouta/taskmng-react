import { GENERALDETAILFILEPATH, JSONEXTENSION, MASTERFILEPATH } from "./Common/Const.tsx/CommonConst";
import { generalDetailType } from "./Common/Type/CommonType";
import { readFile } from "./FileFunction";

/**
 * 汎用詳細データを取得
 */
export function getGeneralDetailData(id?: string) {
    //汎用詳細ファイルの読み込み
    let generalDetailFileData = readFile(`${MASTERFILEPATH}${GENERALDETAILFILEPATH}${JSONEXTENSION}`);
    let decodeGeneralDetailFileData: generalDetailType[] = JSON.parse(generalDetailFileData);
    let taskPriorityList = decodeGeneralDetailFileData.filter((element) => {
        //idで絞り込み
        if (id) {
            return element.id === id;
        }
        return true;
    });
    return taskPriorityList;
}