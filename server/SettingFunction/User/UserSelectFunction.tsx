import { JSONEXTENSION, SETTINGFILEPATH, USERINFOFILEPATH } from "../../Constant";
import { getFileJsonData } from "../../FileFunction";
import { userInfoType } from "../../Type/type";
import { USERINFO_FILEPATH } from "./UserFunction";


/**
 * ユーザー情報を取得
 */
export function getUserInfoData() {

    //カスタム属性の読み込み
    let decodeFileData: userInfoType[] = getFileJsonData(USERINFO_FILEPATH);

    //削除済のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    return decodeFileData;
}


/**
 * ユーザー情報のリストをIDで絞り込む
 * @param decodeFileData 
 * @param id 
 * @param res 
 * @returns 
 */
export function filterUserInfoDetail(decodeFileData: userInfoType[], id: string, res: any)
    : any {

    let singleCustomAttributeData = decodeFileData.find((element) => { return element.userId === id });
    if (!singleCustomAttributeData) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }
    return res.status(200).json(singleCustomAttributeData);
}