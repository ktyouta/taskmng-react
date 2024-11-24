import { USER_AUTH } from "../../Auth/Const/AuthConst";
import { authType } from "../../Auth/Type/AuthType";
import { FLG } from "../../Common/Const/CommonConst";
import { getFileJsonData } from "../../Common/FileFunction";
import { checkAuthAction } from "../../Common/Function";
import { CATEGORY_FILEPATH, PRE_CATEGORY_ID, SUB_CATEGORY_FILEPATH } from "./Const/CategoryConst";
import { categoryType, resCategoryType, subCategoryType } from "./Type/CategoryType";


/**
 * カテゴリを取得
 */
export function getFilterdCategoryObjList() {

    //カテゴリファイルの読み込み
    let decodeFileData: categoryType[] = getFileJsonData(CATEGORY_FILEPATH);

    return decodeFileData;
}


/**
 * カテゴリの絞り込み(削除済みデータをフィルター)
 */
export function getFilterdCategory() {
    //カテゴリファイルの読み込み
    let decodeFileData: categoryType[] = getFilterdCategoryObjList();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg === FLG.OFF;
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


/**
 * カテゴリのIDを作成
 */
export function createCategoryNewId(categoryList: categoryType[]) {
    //IDが最大のNOを取得
    let maxNo = categoryList.reduce<number>((prev: number, current: categoryType) => {
        let currentNm = parseInt(current.id.replace(`${PRE_CATEGORY_ID}`, ""));
        return Math.max(prev, currentNm);
    }, 0);
    return `${PRE_CATEGORY_ID}${maxNo + 1}`;
}


/**
 * サブメニューを取得
 */
export function getFilterdSubCategoryObjList() {

    //カテゴリファイルの読み込み
    let decodeFileData: subCategoryType[] = getFileJsonData(SUB_CATEGORY_FILEPATH);

    return decodeFileData;
}


/**
 * カテゴリの絞り込み(削除済みデータをフィルター)
 */
export function getFilterdSubCategory() {
    //カテゴリファイルの読み込み
    let decodeFileData: subCategoryType[] = getFilterdSubCategoryObjList();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg === FLG.OFF;
    });

    return decodeFileData;
}


/**
 * カテゴリリストを画面返却用の型に変換する
 * @param categoryList 
 * @returns 
 */
export function convertResCategoryList(categoryList: categoryType[]): resCategoryType[] {

    return categoryList.map((element) => {
        return { ...element, subCategoryList: [] }
    });
}

/**
 * サブメニューリストと結合する
 */
export function joinSubMenuList(
    categoryList: resCategoryType[],
    subCategoryList: subCategoryType[]): resCategoryType[] {

    return categoryList.map((element) => {

        return {
            ...element,
            subCategoryList: getSubMenuList(element.id, subCategoryList),
        }
    });
}


/**
 * 親カテゴリからサブメニューを再帰的に取得する
 * @param parentId 
 * @param subCategoryList 
 */
function getSubMenuList(
    categoryId: string,
    subCategoryList: subCategoryType[],
): resCategoryType[] {

    let tmpSubCategoryList = subCategoryList.filter((element) => {
        return element.parentId === categoryId;
    });

    //自身のカテゴリにサブメニューが存在しない場合
    if (!tmpSubCategoryList || tmpSubCategoryList.length === 0) {
        return [];
    }

    return tmpSubCategoryList.map((element) => {

        return {
            ...element,
            subCategoryList: getSubMenuList(element.id, subCategoryList),
        }
    });
}


/**
 * メニューをユーザーの権限でフィルターする
 * @param menuList 
 * @param authList 
 */
export function filterMenuByAuth(menuList: resCategoryType[],
    authList: authType[]): resCategoryType[] {

    return menuList.filter((element) => {

        //サブメニューーを保持していないメニュー
        if (!element.subCategoryList || element.subCategoryList.length === 0) {

            //メニューに対するユーザーの権限
            let menuAuth = authList.find((element1: authType) => {
                return element1.menuId === element.id;
            })?.auth;

            return menuAuth && checkAuthAction(menuAuth, USER_AUTH.PUBLIC);
        }

        return true;
    });
}


/**
 * サブメニューをユーザーの権限でフィルターする
 * @param menuList 
 * @param authList 
 */
export function filterSubMenuByAuth(menuList: subCategoryType[],
    authList: authType[]): subCategoryType[] {

    return menuList.filter((element) => {

        //メニューに対するユーザーの権限
        let menuAuth = authList.find((element1: authType) => {
            return element1.menuId === element.id;
        })?.auth;

        return menuAuth && checkAuthAction(menuAuth, USER_AUTH.PUBLIC);
    });
}


/**
 * サブメニューを保持していないメニューを省く
 */
export function removeMenusWithoutSubmenu(
    menuList: resCategoryType[],
    subMenuMasterList: subCategoryType[]): resCategoryType[] {

    return menuList.filter((element: resCategoryType) => {

        //マスターに自身のサブメニューの存在チェックを行う
        let subMenuList = subMenuMasterList.filter((element1) => {
            return element1.parentId === element.id;
        });

        //サブメニューを保持しないメニュー
        if (!subMenuList || subMenuList.length === 0) {
            return true;
        }

        //現在自身にセットされているサブメニュー
        let subMenuInMain = element.subCategoryList;

        //自身にサブメニューがセットされていない場合はメニューから省く
        if (!subMenuInMain || subMenuInMain.length === 0) {
            return false;
        }

        //サブメニューがセットされている場合はサブメニュー内をチェックする
        return removeMenusWithoutSubmenu(subMenuInMain, subMenuMasterList).length > 0;
    });
}