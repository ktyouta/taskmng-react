import { readFile } from "../Common/FileFunction";
import { GENERAL_DETAIL_FILEPATH } from "./Const/GeneralConst";
import { generalDetailType } from "./Type/GeneralType";

/**
 * 汎用詳細データを取得
 * @returns 
 */
export function getGeneralDataList() {
    //汎用詳細ファイルの読み込み
    let generalData = readFile(GENERAL_DETAIL_FILEPATH);
    let decodeGeneralData: generalDetailType[] = JSON.parse(generalData);
    return decodeGeneralData;
}


/**
 * 汎用詳細データを取得
 */
export function getGeneralDetailDataList(
    decodeGeneralDetailFileData: generalDetailType[],
    id: string) {

    let idArry = id.split(",");
    let filterdGeneralDetail: generalDetailType[] = [];

    idArry.forEach((element: string,) => {

        filterdGeneralDetail = [...filterdGeneralDetail, ...decodeGeneralDetailFileData.filter((item) => {
            return item.id === element;
        })];
    });

    return filterdGeneralDetail;
}