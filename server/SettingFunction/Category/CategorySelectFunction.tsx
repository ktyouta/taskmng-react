import { CATEGORYFILEPATH, JSONEXTENSION, SETTINGFILEPATH } from "../../Constant";
import { getFileJsonData } from "../../FileFunction";
import { CATEGORY_FILEPATH } from "./Const/CategoryConst";
import { categoryType } from "./Type/CategoryType";


/**
 * カテゴリの絞り込み
 */
export function getFilterdCategory() {
    //カテゴリファイルの読み込み
    let decodeFileData: categoryType[] = getFileJsonData(CATEGORY_FILEPATH);

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * カテゴリを絞り込む
 * @param decodeFileData 
 * @param path 
 * @param res 
 * @returns 
 */
export function filterCategoryDetail(decodeFileData: categoryType[], id: string, res: any)
    : any {

    let singleCustomAttributeData = decodeFileData.find((element) => { return element.id === id });
    if (!singleCustomAttributeData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    return res.status(200).json(singleCustomAttributeData);
}
