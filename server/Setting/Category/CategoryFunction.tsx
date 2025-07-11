import { convertResCategoryList, filterCategoryDetail, filterMenuByAuth, filterSubMenuByAuth, getFilterdCategory, getFilterdSubCategoryObjList, joinSubMenuList, removeMenusWithoutSubmenu } from "./CategorySelectFunction";
import { categoryType, checkOrderType, resCategoryType, subCategoryType } from "./Type/CategoryType";
import { createAddCategoryData } from "./CategoryRegistFunction";
import { createUpdCategoryData, createUpdCategoryOrderData } from "./CategoryUpdateFunction";
import { createDelCategoryData } from "./CategoryDeleteFunction";
import { CATEGORY_FILEPATH } from "./Const/CategoryConst";
import { authenticate } from "../../Auth/AuthFunction";
import { overWriteData } from "../../Common/FileFunction";
import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { checkCategoryAddAuth, checkCategoryChangeOrderAuth, checkCategoryDelAuth, checkCategoryGetDetialAuth, checkCategoryUpdAuth, getUserCategoryAuth } from "./CategoryAuthFunction";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { resUserInfoType } from "../SettingUser/Type/SettingUserType";


/**
 * カテゴリの取得
 */
export function getCategory(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //ユーザー情報
    let userInfo: resUserInfoType | undefined = authResult.userInfo;

    //ユーザー情報が存在しない
    if (!userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー情報が存在しません。" });
    }

    //ユーザーの権限リスト
    let authList: authType[] = userInfo.authList;

    //権限リストが存在しない
    if (!authList || authList.length === 0) {
        return res
            .status(authResult.status)
            .json({ errMessage: "表示可能な画面が存在しません。" });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カテゴリが登録されていません。` });
    }

    //レスポンス用の型に変換する
    let resCategoryList: resCategoryType[] = convertResCategoryList(decodeFileData);

    //サブメニューリストを取得する
    let subCategoryList: subCategoryType[] = getFilterdSubCategoryObjList();

    //サブメニューを権限でフィルターする
    let filterdSubCategoryList = filterSubMenuByAuth(subCategoryList, authList);

    //サブメニューリストと結合する
    resCategoryList = joinSubMenuList(resCategoryList, filterdSubCategoryList);

    //メインメニューを権限でフィルターする
    resCategoryList = filterMenuByAuth(resCategoryList, authList);

    //権限不足のサブメニューを再帰的に省く
    resCategoryList = removeMenusWithoutSubmenu(resCategoryList, subCategoryList);

    return res.status(200).json(resCategoryList);
}

/**
 * カテゴリ詳細の取得
 */
export function getCategoryDetail(res: any, req: any, id: string) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリ画面の権限を取得する
    let categoryAuth: authType | undefined = getUserCategoryAuth(authResult.userInfo);

    //カテゴリ画面に関する権限が存在しない場合
    if (!categoryAuth || !categoryAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カテゴリ画面の権限がありません。" });
    }

    //カテゴリ詳細取得権限チェック
    let categoryGetDetailAuthObj: resActionAuthType = checkCategoryGetDetialAuth(categoryAuth);

    //カテゴリ権限エラー
    if (categoryGetDetailAuthObj.message) {
        return res
            .status(categoryGetDetailAuthObj.status)
            .json({ errMessage: categoryGetDetailAuthObj.message });
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

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリ画面の権限を取得する
    let categoryAuth: authType | undefined = getUserCategoryAuth(authResult.userInfo);

    //カテゴリ画面に関する権限が存在しない場合
    if (!categoryAuth || !categoryAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カテゴリ画面の権限がありません。" });
    }

    //カテゴリ登録権限チェック
    let categoryAddAuthObj: resActionAuthType = checkCategoryAddAuth(categoryAuth);

    //カテゴリ権限エラー
    if (categoryAddAuthObj.message) {
        return res
            .status(categoryAddAuthObj.status)
            .json({ errMessage: categoryAddAuthObj.message });
    }

    //カテゴリの読み込み
    let decodeFileData: categoryType[] = getFilterdCategory();

    //登録用データの作成
    let registData = createAddCategoryData(decodeFileData, req, authResult);

    //カテゴリが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "カテゴリの登録に失敗しました。" });
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

    //IDの指定がない
    if (!id) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリ画面の権限を取得する
    let categoryAuth: authType | undefined = getUserCategoryAuth(authResult.userInfo);

    //カテゴリ画面に関する権限が存在しない場合
    if (!categoryAuth || !categoryAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カテゴリ画面の権限がありません。" });
    }

    //カテゴリ更新権限チェック
    let categoryUpdAuthObj: resActionAuthType = checkCategoryUpdAuth(categoryAuth);

    //カテゴリ権限エラー
    if (categoryUpdAuthObj.message) {
        return res
            .status(categoryUpdAuthObj.status)
            .json({ errMessage: categoryUpdAuthObj.message });
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

    //IDの指定がない
    if (!id) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリ画面の権限を取得する
    let categoryAuth: authType | undefined = getUserCategoryAuth(authResult.userInfo);

    //カテゴリ画面に関する権限が存在しない場合
    if (!categoryAuth || !categoryAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カテゴリ画面の権限がありません。" });
    }

    //カテゴリ削除権限チェック
    let categoryDelAuthObj: resActionAuthType = checkCategoryDelAuth(categoryAuth);

    //カテゴリ権限エラー
    if (categoryDelAuthObj.message) {
        return res
            .status(categoryDelAuthObj.status)
            .json({ errMessage: categoryDelAuthObj.message });
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

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //カテゴリ画面の権限を取得する
    let categoryAuth: authType | undefined = getUserCategoryAuth(authResult.userInfo);

    //カテゴリ画面に関する権限が存在しない場合
    if (!categoryAuth || !categoryAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カテゴリ画面の権限がありません。" });
    }

    //カテゴリの表示順更新権限チェック
    let categoryChangeOrderAuthObj: resActionAuthType = checkCategoryChangeOrderAuth(categoryAuth);

    //カテゴリ権限エラー
    if (categoryChangeOrderAuthObj.message) {
        return res
            .status(categoryChangeOrderAuthObj.status)
            .json({ errMessage: categoryChangeOrderAuthObj.message });
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