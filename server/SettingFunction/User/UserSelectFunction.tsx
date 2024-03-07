import { generalDetailType } from "../../Common/Type/CommonType";
import { getFileJsonData } from "../../FileFunction";
import { GENERALDETAIL_FILEPATH } from "../DefaultAttribute/Const/DefaultAttributeConst";
import { AUTH_ID, USERINFO_FILEPATH } from "./Const/UserConst";
import { userInfoType } from "./Type/UserType";


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

/**
 * 権限情報の紐づけ
 * @param decodeFileData 
 * @param id 
 * @param res 
 * @returns 
 */
export function joinAuthInfo(decodeFileData: userInfoType[])
    : any {

    //汎用詳細の読み込み
    let generalDatas: generalDetailType[] = getFileJsonData(GENERALDETAIL_FILEPATH);

    //権限リスト
    let authList: generalDetailType[] = generalDatas.filter((element) => {
        return element.id === AUTH_ID;
    });

    //権限の紐づけ
    decodeFileData.forEach((element) => {
        //権限の名称を取得
        let authObj = authList.find((element1) => {
            return element1.value === element.auth;
        });
        if (!authObj) {
            return;
        }
        element.authNm = authObj.label;
    });

    return decodeFileData;
}
