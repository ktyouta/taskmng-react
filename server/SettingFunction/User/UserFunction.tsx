import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { userInfoType } from "../../Type/type";
import { getUserInfoData } from "./UserSelectFunction";


//カスタム属性ファイルのパス
export const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
export const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;
//カスタム属性IDの接頭辞
export const PRE_CUSTOMATTRIBUTE_ID = `ATTRIBUTEID-`;
//カスタム属性リストIDの接頭辞
export const PRE_CUSTOMATTRIBUTELIST_ID = `ATTRIBUTELISTID-`;


/**
 * ユーザー情報の取得
 */
export function getUserInfo(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //カスタム属性の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `ユーザー情報が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}