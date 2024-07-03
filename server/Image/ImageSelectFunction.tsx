import { imageListResType, imageListType } from "./Type/ImageType";
import { IMAGE_FILEPATH, IMAGE_FOLDER_ORIGINAL, IMAGE_FOLDER_STAND, IMAGE_TYPE } from "./Const/ImageConst";
import { getFileJsonData, readFile } from "../Common/FileFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";
import { GENERALDETAIL_FILEPATH } from "../Setting/DefaultAttribute/Const/DefaultAttributeConst";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";
import { comboType, tagType } from "../Common/Type/CommonType";
import { getFormatDate } from "../Common/Function";
import { TAGFILENM } from "../Common/Const/CommonConst";
import { tagListType } from "../Tag/Type/TagType";
import { TAG_FILEPATH } from "../Tag/Const/TagConst";
import { userInfoType } from "../Setting/User/Type/UserType";



/**
 * 画像リストファイルからオブジェクトを取得
 */
export function getImageObj(): imageListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(IMAGE_FILEPATH);
    return JSON.parse(fileData);
}


/**
 * 削除データをフィルターする
 */
export function getFilterdImage() {
    //メ画像リストファイルの読み込み
    let decodeFileData: imageListType[] = getImageObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}

/**
 * 画像リストを画面返却用の型に変換
 */
export function convImage(decodeFileData: imageListType[]): imageListResType[] {

    //画面返却用の型に変換
    let convImageList: imageListResType[] = decodeFileData.map((element) => {
        return convImageDetail(element);
    });

    return convImageList;
}

/**
 * 画像リストを画面返却用の型に変換
 */
export function convImageDetail(decodeFileData: imageListType): imageListResType {

    let imageUrl = "";

    //画像タイプからURLを作成
    switch (decodeFileData.imageType) {
        //スタンダード
        case IMAGE_TYPE.standard:
            imageUrl = `${IMAGE_FOLDER_STAND}/${decodeFileData.imageName}`;
            break;
        //オリジナル
        case IMAGE_TYPE.original:
            imageUrl = IMAGE_FOLDER_ORIGINAL;
            break;
    }

    //画面返却用の型に変換
    return (
        { ...decodeFileData, imageUrl }
    );
}

/**
 * 画像のIDを作成
 */
export function createImageNewId(tagList: tagListType[]) {
    //IDが最大のNOを取得
    let maxNo = tagList.reduce<number>((prev: number, current: tagListType) => {
        let id = current.id;
        if (!id) {
            id = "1";
        }
        let currentNm = parseInt(current.id);
        return Math.max(prev, currentNm);
    }, 0);
    return `${maxNo + 1}`;
}

/**
 * メモリストをクエリストリングで絞り込む
 */
export function filterImageQuery(resImageList: imageListResType[], query: any): imageListResType[] {

    //画像タイプ
    let imageType = query.imageType;

    if (imageType !== IMAGE_TYPE.standard && imageType !== IMAGE_TYPE.original) {
        return resImageList;
    }

    return resImageList.filter((element: imageListResType) => {
        return element.imageType === imageType
    });
}