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
import { CATEGORY_FILEPATH, filterCategoryDetail, getFilterdCategory } from "./CategorySelectFunction";
import { categoryType } from "./Type/CategoryType";
import { createAddCategoryData } from "./CategoryRegistFunction";
import { createUpdCategoryData } from "./CategoryUpdateFunction";
import { createDelCategoryData } from "./CategoryDeleteFunction";


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

/**
 * カテゴリの追加
 */
export function runAddCategory(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //登録用データの作成
    let registData = createAddCategoryData(decodeFileData, req, authResult);

    //カテゴリが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "カテゴリが登録されませんでした。" });
    }

    //表示順を割り当てる
    registData = createOrder(registData)

    //データを登録
    let errMessage = overWriteData(CATEGORY_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * カテゴリの更新
 */
export function runUpdCategory(res: any, req: any, id: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!id) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //更新用データの作成
    let registData = createUpdCategoryData(decodeFileData, req, authResult, id);

    //カテゴリが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "カテゴリが登録されませんでした。" });
    }

    //表示順を割り当てる
    registData = createOrder(registData)

    //データを登録
    let errMessage = overWriteData(CATEGORY_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * カテゴリの削除
 */
export function runDeleteCategory(res: any, req: any, id: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!id) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //削除用データの作成
    let delData = createDelCategoryData(decodeFileData, req, authResult, id);

    //カテゴリが登録されていない
    if (!delData || !Array.isArray(delData) || delData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "カテゴリが登録されませんでした。" });
    }

    //表示順を割り当てる
    delData = createOrder(delData)

    //データを登録
    let errMessage = overWriteData(CATEGORY_FILEPATH, JSON.stringify(delData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}


/**
 * 表示順の設定
 * @param decodeFileData 
 */
export function createOrder(decodeFileData: categoryType[]) {

    decodeFileData.forEach((element, index) => {
        if (element.deleteFlg === "0") {
            element.order = `${index + 1}`;
        }
    });
    return decodeFileData;
}