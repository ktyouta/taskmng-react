import { GENERALDETAILFILEPATH, JSONEXTENSION, MASTERFILEPATH } from "./Constant";
import { readFile } from "./FileFunction";
import { generalDetailType } from "./Type/type";

/**
 * 汎用詳細データを取得
 */
export function getGeneralDetailData(id: string) {
    //汎用詳細ファイルの読み込み
    let generalDetailFileData = readFile(`${MASTERFILEPATH}${GENERALDETAILFILEPATH}${JSONEXTENSION}`);
    let decodeGeneralDetailFileData: generalDetailType[] = JSON.parse(generalDetailFileData);
    //idで絞り込み
    let taskPriorityList = decodeGeneralDetailFileData.filter((element) => {
        if (id) {
            return element.id === id;
        }
        return true;
    });
    return taskPriorityList;
}