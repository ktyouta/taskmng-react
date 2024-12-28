import { authenticate } from "../../Auth/AuthFunction";
import { getAuthObjList, getUserAuthList } from "../../Auth/AuthSelectFunction";
import { AUTH_FILEPATH } from "../../Auth/Const/AuthConst";
import { authInfoType } from "../../Auth/Type/AuthType";
import { overWriteData } from "../../Common/FileFunction";
import { resActionAuthType } from "../../Common/Type/CommonType";
import { SELECT_ICON_TYPE, USERINFO_FILEPATH } from "./Const/SettingUserConst";
import { registUserInfoType, updUserInfoType, userInfoType } from "./Type/SettingUserType";
import { checkSettingUserAddAuth, checkSettingUserDelAuth, checkSettingUserGetAuth, checkSettingUserGetDetailAuth, checkSettingUserUpdAuth, getSettingUserAuth, } from "./SettingUserAuthFunction";
import { createDeleteUserData, createDelUserAuth } from "./SettingUserDeleteFunction";
import { checkDubUserAuth, convAuthList, createAddUserAuth, createAddUserData, dubUserCheck } from "./SettingUserRegistFunction";
import { createRestUserInfo, getUserAuth, getUserInfoData } from "./SettingUserSelectFunction";
import { createUpdUserData, createUpdUserAuth } from "./SettingUserUpdateFunction";



/**
 * ユーザー情報の取得
 */
export function getUserInfo(res: any, req: any) {

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

    //ユーザー設定画面の権限を取得
    let settingUserAuth = getSettingUserAuth(authResult.userInfo);

    //ユーザー設定画面の権限が存在しない
    if (!settingUserAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー設定画面の権限がありません。" });
    }

    //ユーザー情報リスト権限チェック
    let settingUserGetAuthObj: resActionAuthType = checkSettingUserGetAuth(settingUserAuth);

    //ユーザー情報リスト権限エラー
    if (settingUserGetAuthObj.message) {
        return res
            .status(settingUserGetAuthObj.status)
            .json({ errMessage: settingUserGetAuthObj.message });
    }

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `ユーザー情報が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}

/**
 * ユーザー詳細の取得
 */
export function getSettingUserInfoDetail(res: any, req: any, id: string) {

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

    //ユーザー設定画面の権限を取得
    let settingUserAuth = getSettingUserAuth(authResult.userInfo);

    //ユーザー設定画面の権限が存在しない
    if (!settingUserAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー設定画面の権限がありません。" });
    }

    //ユーザー情報詳細権限チェック
    let settingUserGetDetailAuthObj: resActionAuthType = checkSettingUserGetDetailAuth(settingUserAuth);

    //詳細取得権限エラー
    if (settingUserGetDetailAuthObj.message) {
        return res
            .status(settingUserGetDetailAuthObj.status)
            .json({ errMessage: settingUserGetDetailAuthObj.message });
    }

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `ユーザー情報が登録されていません。` });
    }

    //ユーザーIDを元にリストからユーザーデータを取得
    let userInfoObj: userInfoType | undefined = decodeFileData.find((element) => { return element.userId === id });

    //IDからユーザーが取得に失敗
    if (!userInfoObj) {
        return res.status(400).json({ errMessage: `該当ユーザーが存在しません。` });
    }

    //ユーザーの権限情報を取得する
    let userAuthList = getUserAuth(userInfoObj.userId);

    //権限情報が存在しない
    if (!userAuthList || userAuthList.length === 0) {
        userAuthList = [];
    }

    //レスポンス用のユーザー情報を作成する
    let resUserInfoObj = createRestUserInfo(userInfoObj, userAuthList);

    return res.status(200).json(resUserInfoObj);
}


/**
 * ユーザーの追加
 */
export function runAddUser(res: any, req: any) {

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

    //ユーザー設定画面の権限を取得
    let settingUserAuth = getSettingUserAuth(authResult.userInfo);

    //ユーザー設定画面の権限が存在しない
    if (!settingUserAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー設定画面の権限がありません。" });
    }

    //登録権限チェック
    let settingUserAddAuthObj: resActionAuthType = checkSettingUserAddAuth(settingUserAuth);

    //登録権限エラー
    if (settingUserAddAuthObj.message) {
        return res
            .status(settingUserAddAuthObj.status)
            .json({ errMessage: settingUserAddAuthObj.message });
    }

    //リクエストボディ
    let requestBody: registUserInfoType = req.body;

    if (!requestBody || !requestBody.userId) {
        return res
            .status(400)
            .json({ errMessage: "登録に必要な情報が不足しています。" });
    }

    //ユーザーID
    let userId: string = requestBody.userId;

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    //IDの重複チェック
    let dubErrMessage = dubUserCheck(decodeFileData, requestBody);

    //重複エラー
    if (dubErrMessage) {
        return res
            .status(400)
            .json({ errMessage: dubErrMessage });
    }

    //登録用データの作成
    let registData = createAddUserData(decodeFileData, requestBody);

    //ユーザーが登録されていない
    if (!registData || !Array.isArray(registData) || registData.length === 0) {
        return res
            .status(400)
            .json({ errMessage: "ユーザーが登録されませんでした。" });
    }

    //権限情報を取得する
    let authList = getAuthObjList();

    //権限の重複チェック
    if (checkDubUserAuth(authList, userId)) {
        return res
            .status(500)
            .json({ errMessage: "権限情報が既に登録されています。" });
    }

    //リクエストの権限情報を登録用の型に変換する
    let addAuthList = convAuthList(requestBody.authList, userId);

    //権限データの作成
    let registAuthList = createAddUserAuth(authList, addAuthList);

    //データを登録
    let errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(registData, null, '\t'));

    //ユーザー情報の登録に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //権限データを登録
    errMessage = overWriteData(AUTH_FILEPATH, JSON.stringify(registAuthList, null, '\t'));

    //権限情報の登録に失敗
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

    //IDの指定がない
    if (!userId) {
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

    //ユーザー設定画面の権限を取得
    let settingUserAuth = getSettingUserAuth(authResult.userInfo);

    //ユーザー設定画面の権限が存在しない
    if (!settingUserAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー設定画面の権限がありません。" });
    }

    //削除権限チェック
    let settingUserDelAuthObj: resActionAuthType = checkSettingUserDelAuth(settingUserAuth);

    //削除権限エラー
    if (settingUserDelAuthObj.message) {
        return res
            .status(settingUserDelAuthObj.status)
            .json({ errMessage: settingUserDelAuthObj.message });
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

    //権限情報を取得する
    let authList = getAuthObjList();

    //削除用権限データの作成
    let delAuthList = createDelUserAuth(authList, userId);

    //データを削除
    errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(delData, null, '\t'));

    //削除に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //権限データを削除
    errMessage = overWriteData(AUTH_FILEPATH, JSON.stringify(delAuthList, null, '\t'));

    //権限情報の登録に失敗
    if (errMessage) {
        return res
            .status(400)
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

    //IDの指定がない
    if (!userId) {
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

    //ユーザー設定画面の権限を取得
    let settingUserAuth = getSettingUserAuth(authResult.userInfo);

    //ユーザー設定画面の権限が存在しない
    if (!settingUserAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー設定画面の権限がありません。" });
    }

    //更新権限チェック
    let settingUserUpdAuthObj: resActionAuthType = checkSettingUserUpdAuth(settingUserAuth);

    //更新権限エラー
    if (settingUserUpdAuthObj.message) {
        return res
            .status(settingUserUpdAuthObj.status)
            .json({ errMessage: settingUserUpdAuthObj.message });
    }

    let errMessage = "";

    //ユーザー情報の読み込み
    let decodeFileData: userInfoType[] = getUserInfoData();

    if (!decodeFileData) {
        return res
            .status(400)
            .json({ errMessage: `ユーザー情報が存在しません。` });
    }

    //リクエストボディ
    let requestBody: updUserInfoType = req.body;

    if (!isCorrectIconType(requestBody.iconType)) {
        return res
            .status(400)
            .json({ errMessage: `アイコン設定の選択値が不正です。` });
    }

    //更新データの作成
    let updData = createUpdUserData(decodeFileData, requestBody, userId);

    //権限情報を取得する
    let authList = getAuthObjList();

    //更新用権限データの作成
    let updAuthList = createUpdUserAuth(authList, requestBody.authList);

    //ユーザー情報を更新
    errMessage = overWriteData(USERINFO_FILEPATH, JSON.stringify(updData, null, '\t'));

    //ユーザー情報の更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //権限データを更新
    errMessage = overWriteData(AUTH_FILEPATH, JSON.stringify(updAuthList, null, '\t'));

    //権限情報の登録に失敗
    if (errMessage) {
        return res
            .status(400)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `更新が完了しました。` });
}

/**
 * アイコンタイプのチェック
 */
export function isCorrectIconType(iconType?: string,) {

    if (!iconType) {
        return false;
    }

    return Object.keys(SELECT_ICON_TYPE).map((element) => {
        return SELECT_ICON_TYPE[element];
    }).some((element) => {
        return element === iconType;
    });
}