import { createUpdDefaultAttribute, createUpdDefaultAttributeSelectList, } from "./DefaultAttributeUpdateFunction";
import { filterDefaultAttributeDetail, getDefaultAttributeData, } from "./DefaultAttributeSelectFunction";
import { defaultAttributeType, defaultAttributeUpdType } from "./Type/DefaultAttributeType";
import { DEFAULT_ATTRIBUTE_FILEPATH, GENERALDETAIL_FILEPATH } from "./Const/DefaultAttributeConst";
import { authenticate } from "../../Auth/AuthFunction";
import { getFileJsonData, overWriteData } from "../../Common/FileFunction";
import { generalDetailType } from "../../General/Type/GeneralType";
import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { checkDefaultAttributeGetAuth, checkDefaultAttributeGetDetailAuth, checkDefaultAttributeUpdAuth, getUserDefaultAttributeAuth } from "./DefaultAttributeAuthFunction";
import { resActionAuthType } from "../../Common/Type/CommonType";



/**
 * デフォルト属性の取得
 */
export function getDefaultAttribute(res: any, req: any) {

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性画面の権限を取得する
    let defalutAttributeAuth: authType | undefined = getUserDefaultAttributeAuth(authResult.userInfo);

    //デフォルト属性に関する権限が存在しない場合
    if (!defalutAttributeAuth || !defalutAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "デフォルト属性画面の権限がありません。" });
    }

    //デフォルト属性リスト取得権限チェック
    let defaultAttributeGetAuthObj: resActionAuthType = checkDefaultAttributeGetAuth(defalutAttributeAuth);

    //デフォルト属性権限エラー
    if (defaultAttributeGetAuthObj.message) {
        return res
            .status(defaultAttributeGetAuthObj.status)
            .json({ errMessage: defaultAttributeGetAuthObj.message });
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

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性画面の権限を取得する
    let defalutAttributeAuth: authType | undefined = getUserDefaultAttributeAuth(authResult.userInfo);

    //デフォルト属性に関する権限が存在しない場合
    if (!defalutAttributeAuth || !defalutAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "デフォルト属性画面の権限がありません。" });
    }

    //デフォルト属性詳細取得権限チェック
    let defaultAttributeGetAuthObj: resActionAuthType = checkDefaultAttributeGetDetailAuth(defalutAttributeAuth);

    //デフォルト属性権限エラー
    if (defaultAttributeGetAuthObj.message) {
        return res
            .status(defaultAttributeGetAuthObj.status)
            .json({ errMessage: defaultAttributeGetAuthObj.message });
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
 * デフォルト属性の更新
 */
export function runUpdDefaultAttribute(res: any, req: any, dfId: string) {

    //IDの指定がない
    if (!dfId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    //有効ユーザーチェック
    let authResult: authInfoType = authenticate(req.cookies.cookie);

    //チェックエラー
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //トークンからユーザー情報が取得できなかった場合
    if (!authResult.userInfo) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //デフォルト属性画面の権限を取得する
    let defalutAttributeAuth: authType | undefined = getUserDefaultAttributeAuth(authResult.userInfo);

    //デフォルト属性に関する権限が存在しない場合
    if (!defalutAttributeAuth || !defalutAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "デフォルト属性画面の権限がありません。" });
    }

    //デフォルト属性更新権限チェック
    let defaultAttributeGetAuthObj: resActionAuthType = checkDefaultAttributeUpdAuth(defalutAttributeAuth);

    //デフォルト属性権限エラー
    if (defaultAttributeGetAuthObj.message) {
        return res
            .status(defaultAttributeGetAuthObj.status)
            .json({ errMessage: defaultAttributeGetAuthObj.message });
    }

    let errMessage = "";

    //デフォルト属性ファイルの読み込み
    let caDecodeFileData: defaultAttributeType[] = getFileJsonData(DEFAULT_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData: defaultAttributeType | undefined = caDecodeFileData.find((element) => {
        return element.id === dfId;
    });

    //更新対象が存在しない
    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `更新対象のデータが存在しません。` });
    }

    //更新不可項目
    if (!filterdCaData.isSettingEditable) {
        return res
            .status(400)
            .json({ errMessage: `選択した項目は更新できません。` });
    }

    let updDefaultAttribute: defaultAttributeUpdType = req.body;

    //更新データの作成
    let updCaData: defaultAttributeType[] = createUpdDefaultAttribute(caDecodeFileData, updDefaultAttribute, dfId);

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
