import { authenticate, checkUpdAuth } from "../../AuthFunction";
import {
    GENERALDETAILFILEPATH,
    JSONEXTENSION,
    MASTERFILEPATH,
    SETTINGFILEPATH,
    TASKINPUTSETTING,
    TRANSACTION,
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { authInfoType, generalDetailType } from "../../Type/type";
import { createUpdDefaultAttribute, createUpdDefaultAttributeSelectList, } from "./DefaultAttributeUpdateFunction";
import { filterDefaultAttributeDetail, getDefaultAttributeData, } from "./DefaultAttributeSelectFunction";
import { defaultAttributeType, defaultAttributeUpdType } from "./Type/DefaultAttributeType";
import { DEFAULT_ATTRIBUTE_FILEPATH, GENERALDETAIL_FILEPATH } from "./Const/DefaultAttributeConst";



/**
 * デフォルト属性の取得
 */
export function getDefaultAttribute(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性の読み込み
    let decodeFileData: defaultAttributeType[] = getDefaultAttributeData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `デフォルト属性が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}

/**
 * デフォルト属性詳細の取得
 */
export function getDefaultAttributeDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性の読み込み
    let decodeFileData: defaultAttributeType[] = getDefaultAttributeData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `デフォルト属性が登録されていません。` });
    }

    return filterDefaultAttributeDetail(decodeFileData, id, res);
}

/**
 * デフォルト属性入力値設定の取得
 */
export function getDefaultAttributeInputSetting(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性の読み込み
    let defaultAttributeList: defaultAttributeType[] = getDefaultAttributeData();

    //データなし
    if (!defaultAttributeList || defaultAttributeList.length === 0) {
        return res.status(400).json({ errMessage: `デフォルト属性が登録されていません。` });
    }

    return res.status(200).json(defaultAttributeList);
}


/**
 * デフォルト属性の更新
 */
export function runUpdDefaultAttribute(res: any, req: any, dfId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!dfId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

    //デフォルト属性ファイルの読み込み
    let caDecodeFileData: defaultAttributeType[] = getFileJsonData(DEFAULT_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData = caDecodeFileData.find((element) => {
        return element.id === dfId;
    });

    //更新対象が存在しない
    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `更新データが存在しません。` });
    }

    let updDefaultAttribute: defaultAttributeUpdType = req.body;

    //更新データの作成
    let updCaData = createUpdDefaultAttribute(caDecodeFileData, updDefaultAttribute, dfId);

    //データを更新
    errMessage = overWriteData(DEFAULT_ATTRIBUTE_FILEPATH, JSON.stringify(updCaData, null, '\t'));
    //更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //選択リストが存在する場合は更新
    if (updDefaultAttribute.selectElementList && updDefaultAttribute.selectElementList.length > 0) {
        //汎用詳細の読み込み
        let generalDatas: generalDetailType[] = getFileJsonData(GENERALDETAIL_FILEPATH);
        //更新データを作成
        let updGeneralDatas = createUpdDefaultAttributeSelectList(generalDatas, updCaData, dfId, updDefaultAttribute.selectElementList);

        //データを更新
        errMessage = overWriteData(GENERALDETAIL_FILEPATH, JSON.stringify(updGeneralDatas, null, '\t'));
        //更新に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}
