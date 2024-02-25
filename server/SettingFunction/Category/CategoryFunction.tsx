import { authenticate, checkUpdAuth } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { authInfoType, customAttributeListType, customAttributeType, taskListType } from "../../Type/type";
import { filterCategoryDetail, getFilterdCategory } from "./CategorySelectFunction";
import { categoryType, checkOrderType } from "./Type/CategoryType";
import { createAddCategoryData } from "./CategoryRegistFunction";
import { createUpdCategoryData, createUpdCategoryOrderData } from "./CategoryUpdateFunction";
import { createDelCategoryData } from "./CategoryDeleteFunction";
import { CATEGORY_FILEPATH } from "./Const/CategoryConst";


/**
 * カテゴリの取得
 */
export function getCategory(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
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
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
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
    let delData = createDelCategoryData(decodeFileData, authResult, id);

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
 * 表示順の更新
 */
export function runUpdCategoryOrder(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    let body: checkOrderType[] = req.body;

    //表示順チェック
    let errMessage = chekcOrder(body);
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //更新用データの作成
    let registData = createUpdCategoryOrderData(decodeFileData, authResult, body);

    //カテゴリが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "カテゴリが登録されませんでした。" });
    }

    //表示順でソート
    registData = convertOrder(registData);

    //表示順を割り当てる
    registData = createOrder(registData)

    //データを登録
    errMessage = overWriteData(CATEGORY_FILEPATH, JSON.stringify(registData, null, '\t'));

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

/**
 * 表示順チェック
 */
function chekcOrder(body: checkOrderType[]) {
    let tmp = body.filter((x, i, self) => {
        return self.indexOf(x) !== self.lastIndexOf(x);
    });
    if (tmp.length > 0) {
        alert("表示順が重複しています。");
        return;
    }
    return "";
}

/**
 * 表示順の整理
 * @param body 
 */
function convertOrder(decodeFileData: categoryType[]) {

    decodeFileData.sort(function (first, second) {
        if (first.order > second.order) {
            return 1;
        } else if (first.order < second.order) {
            return -1;
        } else {
            return 0;
        }
    });

    return decodeFileData;
}