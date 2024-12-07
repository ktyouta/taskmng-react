import { authenticate } from "../../Auth/AuthFunction";
import { getAuthObjList, getUserAuthList } from "../../Auth/AuthSelectFunction";
import { authInfoType } from "../../Auth/Type/AuthType";
import { overWriteData } from "../../Common/FileFunction";
import { SELECT_ICON_TYPE, USERINFO_FILEPATH } from "./Const/UserConst";
import { registUserInfoType, updUserInfoType, userInfoType } from "./Type/UserType";
import { createDeleteUserData } from "./UserDeleteFunction";
import { createAddUserData, dubUserCheck } from "./UserRegistFunction";
import { createRestUserInfo, getUserAuth, getUserInfoData } from "./UserSelectFunction";
import { createUpdUserData } from "./UserUpdateFunction";



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
export function getUserInfoDetail(res: any, req: any, id: string) {

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

    //リクエストボディ
    let requestBody: registUserInfoType = req.body;

    if (!requestBody || !requestBody.userId) {
        return res
            .status(400)
            .json({ errMessage: "登録に必要な情報が不足しています。" });
    }

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
    let registData = createAddUserData(decodeFileData, requestBody, authResult);

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