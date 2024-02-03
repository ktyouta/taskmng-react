import { GENERALDETAILFILEPATH, JSONEXTENSION, MASTERFILEPATH } from "../Constant";
import { readFile } from "../FileFunction";
import { generalDetailType } from "../Type/type";

//汎用詳細ファイルのパス
const GENERAL_DETAIL_FILEPATH = `${MASTERFILEPATH}${GENERALDETAILFILEPATH}${JSONEXTENSION}`;

export function getGeneralDataList() {
    //汎用詳細ファイルの読み込み
    let generalData = readFile(GENERAL_DETAIL_FILEPATH);
    let decodeGeneralData: generalDetailType[] = JSON.parse(generalData);
    return decodeGeneralData;
}