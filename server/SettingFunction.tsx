import { authenticate } from "./AuthFunction";
import { CUSTOMATTRIBUTE, JSONEXTENSION, SEARCHCONDITIONFILEPATH, SETTINGFILEPATH, TASKFILENM, TRANSACTION } from "./Constant";
import { getFileJsonData, overWriteData, readFile } from "./FileFunction";
import { getGeneralDetailData } from "./GeneralFunction";
import { checkUpdAuth } from "./MasterDataFunction";
import { authInfoType, customAttributeType, searchConditionType, taskListType } from "./Type/type";


//カスタム属性ファイルのパス
const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;

/**
 * カスタム属性の取得
 */
export function getCustomAttribute(res: any, req: any, id?: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }
    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //削除フラグが1(削除済)のデータをフィルターする
    decodeFileData = decodeFileData.filter((element) => {
        return element.deleteFlg !== "1";
    });

    //パスパラメータの指定あり
    if (id) {
        let singleCustomAttributeData = decodeFileData.find((element) => { return element.id === id });
        if (!singleCustomAttributeData) {
            return res.status(400).json({ errMessage: `該当データがありません。` });
        }
        return res.status(200).json(singleCustomAttributeData);
    }

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}