import { authenticate } from "../Auth/AuthFunction";
import { getAuthObjList } from "../Auth/AuthSelectFunction";
import { AUTH_FILEPATH } from "../Auth/Const/AuthConst";
import { authInfoType } from "../Auth/Type/AuthType";
import { overWriteFileData } from "../Common/FileFunction";
import { resActionAuthType } from "../Common/Type/CommonType";
import { SELECT_ICON_TYPE, USERINFO_FILEPATH } from "./Const/UserConst";
import { registUserInfoType, updUserInfoType, userInfoType } from "./Type/SettingUserType";
import { checkSettingUserAddAuth, checkSettingUserDelAuth, checkSettingUserGetAuth, checkSettingUserGetDetailAuth, checkSettingUserUpdAuth, getUserScreenAuth, } from "./UserAuthFunction";
import { createRestUserInfo, getUserAuth, getUserInfoData } from "./UserSelectFunction";
import { createUpdUserData, createUpdUserAuth } from "./UserUpdateFunction";



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

    //ユーザー情報画面の権限を取得
    let userScreenAuth = getUserScreenAuth(authResult.userInfo);

    //ユーザー情報画面の権限が存在しない
    if (!userScreenAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー情報画面の権限がありません。" });
    }

    //ユーザー情報詳細権限チェック
    let settingUserGetDetailAuthObj: resActionAuthType = checkSettingUserGetDetailAuth(userScreenAuth);

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

    //ユーザー情報画面の権限を取得
    let userScreenAuth = getUserScreenAuth(authResult.userInfo);

    //ユーザー情報画面の権限が存在しない
    if (!userScreenAuth) {
        return res
            .status(authResult.status)
            .json({ errMessage: "ユーザー情報画面の権限がありません。" });
    }

    //更新権限チェック
    let settingUserUpdAuthObj: resActionAuthType = checkSettingUserUpdAuth(userScreenAuth);

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
    errMessage = overWriteFileData(USERINFO_FILEPATH, updData);

    //ユーザー情報の更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //権限データを更新
    errMessage = overWriteFileData(AUTH_FILEPATH, updAuthList);

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