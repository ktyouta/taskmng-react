import { CATEGORYFILEPATH, JSONEXTENSION, SETTINGFILEPATH } from "../../Constant";
import { getFileJsonData } from "../../FileFunction";
import { categoryType } from "./Type/CategoryType";

//メニューファイルのパス
export const CATEGORY_FILEPATH = `${SETTINGFILEPATH}${CATEGORYFILEPATH}${JSONEXTENSION}`;

/**
 * カテゴリの絞り込み
 */
export function getFilterdCategory() {
    //タスクファイルの読み込み
    let decodeFileData: categoryType[] = getFileJsonData(CATEGORY_FILEPATH);

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}