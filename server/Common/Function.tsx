import { readFile } from "../FileFunction";
import { GENERAL_DETAIL_FILEPATH } from "./Const.tsx/CommonConst";
import { generalDetailType } from "./Type/CommonType";


export function getGeneralDataList() {
    //汎用詳細ファイルの読み込み
    let generalData = readFile(GENERAL_DETAIL_FILEPATH);
    let decodeGeneralData: generalDetailType[] = JSON.parse(generalData);
    return decodeGeneralData;
}


/**
 * 現在日時を取得
 */
export function getNowDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const date = (now.getDate()).toString().padStart(2, "0");
    return `${year}/${month}/${date}`;
}