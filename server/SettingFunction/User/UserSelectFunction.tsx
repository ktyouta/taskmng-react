import { JSONEXTENSION, SETTINGFILEPATH, USERINFOFILEPATH } from "../../Constant";
import { getFileJsonData } from "../../FileFunction";
import { userInfoType } from "../../Type/type";

//ユーザー情報ファイルのパス
export const CUSTOM_ATTRIBUTE_FILEPATH = `${SETTINGFILEPATH}${USERINFOFILEPATH}${JSONEXTENSION}`;


/**
 * ユーザー情報を取得
 */
export function getUserInfoData() {

    //カスタム属性の読み込み
    let decodeFileData: userInfoType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}