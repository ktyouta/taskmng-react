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
import { filterCategoryDetail, getFilterdCategory } from "./CategorySelectFunction";
import { categoryType } from "./Type/CategoryType";


//カスタム属性ファイルのパス
export const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
export const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;
//カスタム属性IDの接頭辞
export const PRE_CUSTOMATTRIBUTE_ID = `ATTRIBUTEID-`;
//カスタム属性リストIDの接頭辞
export const PRE_CUSTOMATTRIBUTELIST_ID = `ATTRIBUTELISTID-`;

//カスタム属性の選択リストの登録メソッドの戻り値
export type registSelectListRetType = {
    errMsg: string,
    registSelectList: customAttributeListType[]
}


/**
 * カテゴリの取得
 */
export function getCategory(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カテゴリが登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}

/**
 * カテゴリ詳細の取得
 */
export function getCategoryDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カテゴリが登録されていません。` });
    }

    return filterCategoryDetail(decodeFileData, id, res);
}
