import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST,
    USERINFOFILEPATH,
    SETTINGFILEPATH
} from "../../Constant";
import { overWriteData } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { userInfoType } from "../../Type/type";
import { createDeleteUserData } from "./UserDeleteFunction";
import { createAddUserData, dubUserCheck } from "./UserRegistFunction";
import { filterUserInfoDetail, getUserInfoData, joinAuthInfo } from "./UserSelectFunction";
import { createUpdUserData } from "./UserUpdateFunction";


//ユーザー情報ファイルのパス
export const USERINFO_FILEPATH = `${SETTINGFILEPATH}${USERINFOFILEPATH}${JSONEXTENSION}`;


/**
 * ユーザー情報の取得
 */
export function getUserInfo(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `ユーザー情報が登録されていません。` });
    }

    //権限情報の紐づけ
    decodeFileData = joinAuthInfo(decodeFileData);

    return res.status(200).json(decodeFileData);
}

/**
 * ユーザー詳細の取得
 */
export function getUserInfoDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `ユーザー情報が登録されていません。` });
    }

    return filterUserInfoDetail(decodeFileData, id, res);
}

/**
 * ユーザーの追加
 */
export function runAddUser(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //IDの重複チェック
    let dubErrMessage = dubUserCheck(decodeFileData, req);

    //重複エラー
    if (dubErrMessage) {
        return res
            .status(400)
            .json({ errMessage: dubErrMessage });
    }

    //登録用データの作成
    let registData = createAddUserData(decodeFileData, req, authResult);

    //ユーザーが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "ユーザーが登録されませんでした。" });
    }

    //データを登録
    let errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(registData, null, '\t'));

    //登録更新削除に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}

/**
 * ユーザーの削除
 */
export function runDeleteUser(res: any, req: any, userId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!userId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    if (!decodeFileData) {
        return res
            .status(400)
            .json({ errMessage: `ユーザー情報が存在しません。` });
    }

    //削除データの作成
    let delData = createDeleteUserData(decodeFileData, userId);

    //データを削除
    errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(delData, null, '\t'));

    //削除に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `削除が完了しました。` });
}


/**
 * ユーザーの更新
 */
export function runUpdUser(res: any, req: any, userId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!userId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    if (!decodeFileData) {
        return res
            .status(400)
            .json({ errMessage: `ユーザー情報が存在しません。` });
    }

    //更新データの作成
    let updData = createUpdUserData(decodeFileData, req, userId);

    //データを更新
    errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(updData, null, '\t'));

    //更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}