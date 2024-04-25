import { readFile } from "../Common/FileFunction";
import { TAG_FILEPATH } from "./Const/TagConst";
import { tagListResType, tagListType } from "./Type/TagType";



/**
 * タグファイルからオブジェクトを取得
 */
export function getTagObj(): tagListType[] {
    //タスクファイルの読み込み
    let fileData = readFile(TAG_FILEPATH);
    return JSON.parse(fileData);
}


/**
 * 削除データをフィルターする
 */
export function getFilterdTag() {
    //タグファイルの読み込み
    let decodeFileData: tagListType[] = getTagObj();

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * タグリストを画面返却用の型に変換
 */
export function convTagList(decodeFileData: tagListType[]): tagListResType[] {

    //画面返却用の型に変換
    let convtagList: tagListResType[] = decodeFileData.map((element) => {
        return convTagDetail(element);
    });

    return convtagList;
}


/**
 * タグリストを画面返却用の型に変換
 */
export function convTagDetail(decodeFileData: tagListType): tagListResType {

    //画面返却用の型に変換
    return (
        {
            value: decodeFileData.id,
            label: decodeFileData.label,
        }
    );
}