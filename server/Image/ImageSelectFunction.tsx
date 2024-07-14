import { imageListResType } from "./Type/ImageType";
import { IMAGE_FILEPATH, IMAGE_FOLDER_ORIGINAL, IMAGE_FOLDER_STAND, IMAGE_TYPE } from "./Const/ImageConst";
import { getFileJsonData, getFileName, readFile } from "../Common/FileFunction";
import { authInfoType } from "../Auth/Type/AuthType";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";
import { GENERALDETAIL_FILEPATH } from "../Setting/DefaultAttribute/Const/DefaultAttributeConst";
import { generalDetailType } from "../General/Type/GeneralType";
import { getGeneralDataList } from "../General/GeneralSelectFunction";
import { comboType, tagType } from "../Common/Type/CommonType";
import { getFormatDate } from "../Common/Function";
import { PUBLIC, SERVER_URL, TAGFILENM } from "../Common/Const/CommonConst";
import { tagListType } from "../Tag/Type/TagType";
import { TAG_FILEPATH } from "../Tag/Const/TagConst";
import { userInfoType } from "../Setting/User/Type/UserType";


/**
 * 画像名を取得
 * @param query 
 * @returns 
 */
export function getIconName(query: any) {

    //画像タイプ
    let imageType = query.imageType;
    //ディレクトリ内のファイル名
    let imagePathNameList: string[] = [];

    switch (imageType) {
        //スタンダード
        case IMAGE_TYPE.standard:
            imagePathNameList = joinFilePath(getFileName(`${PUBLIC}${IMAGE_FOLDER_STAND}`), `${SERVER_URL}${IMAGE_FOLDER_STAND}`);
            break;
        //オリジナル
        case IMAGE_TYPE.original:
            imagePathNameList = joinFilePath(getFileName(`${PUBLIC}${IMAGE_FOLDER_ORIGINAL}`), `${SERVER_URL}${IMAGE_FOLDER_ORIGINAL}`);
            break;
        default:
            imagePathNameList = joinFilePath(getFileName(`${PUBLIC}${IMAGE_FOLDER_STAND}`), `${SERVER_URL}${IMAGE_FOLDER_STAND}`);
            imagePathNameList = [...imagePathNameList, ...joinFilePath(getFileName(`${PUBLIC}${IMAGE_FOLDER_ORIGINAL}`), `${SERVER_URL}${IMAGE_FOLDER_ORIGINAL}`)]
            break;
    }

    return imagePathNameList;
}

/**
 * 画像名とディレクトリパスを結合
 * @param imageNameList 
 * @param imagePath 
 * @returns 
 */
function joinFilePath(imageNameList: string[], imagePath: string,) {

    return imageNameList.map((element) => {
        return `${imagePath}/${element}`;
    });
}

/**
 * 画像リストを画面返却用の型に変換
 */
export function convImage(imageNameList: string[],): imageListResType[] {

    //画面返却用の型に変換
    return imageNameList.map((element) => {
        return {
            iconUrl: element
        }
    });
}