import { callCreateAddSearchCondition, createAddCustomAttribute, createAddCustomAttributeList, runCreateSelectList } from "./CustomAttributeRegistFunction";
import { callCreateDelSearchCondition, createDeleteCustomAttribute, createDeleteCustomAttributeList, runDeleteSelectList } from "./CustomAttributeDeleteFunction";
import { callCreateUpdSearchCondition, createUpdCustomAttribute, createUpdCustomAttributeList, runUpdSelectList } from "./CustomAttributeUpdateFunction";
import { convertCustomAttribute, getCustomAttributeAuth, getCustomAttributeByUserAuth, getCustomAttributeData, getCustomAttributeListData, joinCustomAttributeList, joinCustomAttributeSelectList } from "./CustomAttributeSelectFunction";
import { CUSTOM_ATTRIBUTE_FILEPATH } from "./Const/CustomAttributeConst";
import { customAttributeListType, customAttributeType, reqClientCustomAttributeType, resClientCustomAttributeType, selectElementListType } from "./Type/CustomAttributeType";
import { authenticate } from "../../Auth/AuthFunction";
import { getFileJsonData, overWriteData } from "../../Common/FileFunction";
import { searchConditionType } from "../SearchCondition/Type/SearchConditionType";
import { filterSearchConditionByUserAuth, getSearchConditionList, getSearchConditionObj } from "../SearchCondition/SearchConditionSelectFunction";
import { SEARCHCONDITION_FILE_PATH } from "../SearchCondition/Const/SearchConditionConst";
import { inputSettingType, resActionAuthType } from "../../Common/Type/CommonType";
import { authInfoType, authType } from "../../Auth/Type/AuthType";
import { checkCustomAttributeAddAuth, checkCustomAttributeDelAuth, checkCustomAttributeGetAuth, checkCustomAttributeGetDetialAuth, checkCustomAttributeUpdAuth, getUserCustomAttributeAuth } from "./CustomAttributeAuthFunction";
import { checkDefaultAttributeGetAuth } from "../DefaultAttribute/DefaultAttributeAuthFunction";
import { getUserTaskAuth } from "../../Task/TaskAuthFunction";



/**
 * カスタム属性の取得
 */
export function getCustomAttribute(res: any, req: any) {

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

    //カスタム属性画面の権限を取得する
    let customAttributeAuth: authType | undefined = getUserCustomAttributeAuth(authResult.userInfo);

    //カスタム属性に関する権限が存在しない場合
    if (!customAttributeAuth || !customAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カスタム属性画面の権限がありません。" });
    }

    //カスタム属性リスト取得権限チェック
    let customAttributeGetAuthObj: resActionAuthType = checkCustomAttributeGetAuth(customAttributeAuth);

    //カスタム属性権限エラー
    if (customAttributeGetAuthObj.message) {
        return res
            .status(customAttributeGetAuthObj.status)
            .json({ errMessage: customAttributeGetAuthObj.message });
    }

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    return res.status(200).json(decodeFileData);
}

/**
 * カスタム属性詳細の取得
 */
export function getCustomAttributeDetail(res: any, req: any, id: string) {

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

    //カスタム属性画面の権限を取得する
    let customAttributeAuth: authType | undefined = getUserCustomAttributeAuth(authResult.userInfo);

    //カスタム属性に関する権限が存在しない場合
    if (!customAttributeAuth || !customAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カスタム属性画面の権限がありません。" });
    }

    //カスタム属性詳細取得権限チェック
    let customAttributeGetDetailAuthObj: resActionAuthType = checkCustomAttributeGetDetialAuth(customAttributeAuth);

    //カスタム属性権限エラー
    if (customAttributeGetDetailAuthObj.message) {
        return res
            .status(customAttributeGetDetailAuthObj.status)
            .json({ errMessage: customAttributeGetDetailAuthObj.message });
    }

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    //IDに一致するカスタム属性を取得
    let singleCustomAttributeData = decodeFileData.find((element) => {
        return element.id === id
    });

    //IDに一致するカスタム属性が存在しない
    if (!singleCustomAttributeData) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    //画面返却用に型変換
    let resClientCustomAttribute: resClientCustomAttributeType = convertCustomAttribute(singleCustomAttributeData);

    //選択リストを結合する
    resClientCustomAttribute = joinCustomAttributeSelectList(resClientCustomAttribute);

    //検索条件から権限を取得する
    resClientCustomAttribute = getCustomAttributeAuth(resClientCustomAttribute);

    return res.status(200).json(resClientCustomAttribute);
}


/**
 * カスタム属性入力値設定の取得
 */
export function getCustomAttributeInputSetting(res: any, req: any) {

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

    //タスク画面の権限を取得
    let taskUseruth = getUserTaskAuth(authResult.userInfo);

    //タスクに関する権限が存在しない場合
    if (!taskUseruth || !taskUseruth.auth) {
        return res
            .status(403)
            .json({ errMessage: "タスク画面の権限が存在しないためカスタム属性入力設定値を取得できません。" });
    }

    //カスタム属性の読み込み
    let customAttributeList: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!customAttributeList || customAttributeList.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionList();

    //ユーザー権限でフィルター
    let filterdSearchConditionList = filterSearchConditionByUserAuth(searchConditionList, taskUseruth.auth);

    //権限でフィルターする
    customAttributeList = getCustomAttributeByUserAuth(customAttributeList, filterdSearchConditionList);

    //カスタム属性選択リストの読み込み
    let customAttributeSelectList: customAttributeListType[] = getCustomAttributeListData();

    //選択リストと結合する
    let retCustomAttributeList: inputSettingType[] = joinCustomAttributeList(customAttributeList, customAttributeSelectList);

    return res.status(200).json(retCustomAttributeList);
}


/**
 * カスタム属性の登録
 */
export function runAddCustomAttribute(res: any, req: any) {

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

    //カスタム属性画面の権限を取得する
    let customAttributeAuth: authType | undefined = getUserCustomAttributeAuth(authResult.userInfo);

    //カスタム属性に関する権限が存在しない場合
    if (!customAttributeAuth || !customAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カスタム属性画面の権限がありません。" });
    }

    //カスタム属性登録権限チェック
    let customAttributeAddAuthObj: resActionAuthType = checkCustomAttributeAddAuth(customAttributeAuth);

    //カスタム属性権限エラー
    if (customAttributeAddAuthObj.message) {
        return res
            .status(customAttributeAddAuthObj.status)
            .json({ errMessage: customAttributeAddAuthObj.message });
    }

    //リクエストボディ
    let body: reqClientCustomAttributeType = req.body;

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //カスタム属性の登録用データの作成
    let caRegistDataObj = createAddCustomAttribute(caDecodeFileData, body, authResult);

    //エラー
    if (caRegistDataObj.errMessage) {
        return res
            .status(400)
            .json({ errMessage: caRegistDataObj.errMessage });
    }

    //データを登録
    let errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(caRegistDataObj.registDatas, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //カスタム属性リストのIDが存在する場合はリストを登録する
    let selectList: selectElementListType[] = body.selectElementList ?? [];
    selectList = selectList.filter((element) => {
        //空欄は登録しない
        return element.value !== "";
    });

    let registListFlg: boolean = selectList && selectList.length > 0;

    //カスタム属性リストを登録
    if (registListFlg) {
        errMessage = runCreateSelectList(caRegistDataObj.registDatas, selectList, authResult);

        //IDの整合性エラー
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionObj();

    //検索条件設定登録用データの作成
    let saRegistData = callCreateAddSearchCondition(searchConditionList, body,
        caRegistDataObj.customAttributeId, caRegistDataObj.registDatas, authResult);

    //データを登録
    errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(saRegistData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //正常終了
    return res
        .status(200)
        .json({ errMessage: `登録が完了しました。` });
}


/**
 * カスタム属性の削除
 */
export function runDeleteCustomAttribute(res: any, req: any, caId: string) {

    //IDの指定がない
    if (!caId) {
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

    //カスタム属性画面の権限を取得する
    let customAttributeAuth: authType | undefined = getUserCustomAttributeAuth(authResult.userInfo);

    //カスタム属性に関する権限が存在しない場合
    if (!customAttributeAuth || !customAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カスタム属性画面の権限がありません。" });
    }

    //カスタム属性削除権限チェック
    let customAttributeDelAuthObj: resActionAuthType = checkCustomAttributeDelAuth(customAttributeAuth);

    //カスタム属性権限エラー
    if (customAttributeDelAuthObj.message) {
        return res
            .status(customAttributeDelAuthObj.status)
            .json({ errMessage: customAttributeDelAuthObj.message });
    }

    let errMessage = "";

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData = caDecodeFileData.find((element) => {
        return element.id === caId;
    });

    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `削除データが存在しません。` });
    }

    //削除データの作成
    let delCaData = createDeleteCustomAttribute(caDecodeFileData, caId, authResult);

    //データを削除
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(delCaData, null, '\t'));

    //削除に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //カスタム属性リストのIDが存在する場合はリストを削除する
    let selectListId = filterdCaData.selectElementListId;
    if (selectListId) {
        errMessage = runDeleteSelectList(selectListId);

        //削除に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionObj();

    //検索条件設定データの削除
    let saRegistData = callCreateDelSearchCondition(searchConditionList, caId, authResult);

    //データを登録
    errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(saRegistData, null, '\t'));

    //登録に失敗
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
 * カスタム属性の更新
 */
export function runUpdCustomAttribute(res: any, req: any, caId: string) {

    //IDの指定がない
    if (!caId) {
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

    //カスタム属性画面の権限を取得する
    let customAttributeAuth: authType | undefined = getUserCustomAttributeAuth(authResult.userInfo);

    //カスタム属性に関する権限が存在しない場合
    if (!customAttributeAuth || !customAttributeAuth.auth) {
        return res
            .status(403)
            .json({ errMessage: "カスタム属性画面の権限がありません。" });
    }

    //カスタム属性更新権限チェック
    let customAttributeDelAuthObj: resActionAuthType = checkCustomAttributeUpdAuth(customAttributeAuth);

    //カスタム属性権限エラー
    if (customAttributeDelAuthObj.message) {
        return res
            .status(customAttributeDelAuthObj.status)
            .json({ errMessage: customAttributeDelAuthObj.message });
    }

    let errMessage = "";
    let body: reqClientCustomAttributeType = req.body;

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //存在チェック
    let filterdCaData = caDecodeFileData.find((element) => {
        return element.id === caId;
    });

    //更新対象が存在しない
    if (!filterdCaData) {
        return res
            .status(400)
            .json({ errMessage: `更新データが存在しません。` });
    }

    //更新データの作成
    let caUpdDataObj = createUpdCustomAttribute(caDecodeFileData, body, caId, authResult);

    //エラー
    if (caUpdDataObj.errMessage) {
        return res
            .status(500)
            .json({ errMessage: caUpdDataObj.errMessage });
    }

    let updCaData = caUpdDataObj.updDatas.find((element) => {
        return element.id === caId;
    });

    if (!updCaData) {
        return res
            .status(400)
            .json({ errMessage: "更新データが存在しません。" });
    }

    //データを更新
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(caUpdDataObj.updDatas, null, '\t'));

    //更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //選択形式の場合はリストの追加更新をする
    if (updCaData.selectElementListId) {
        //選択リストの追加および更新
        errMessage = runUpdSelectList(caUpdDataObj.updDatas, filterdCaData, body, caId, authResult);

        //リストの更新に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }
    else {
        //選択リストを削除する
        errMessage = runDeleteSelectList(caId);

        //リストの更新に失敗
        if (errMessage) {
            return res
                .status(500)
                .json({ errMessage });
        }
    }

    //検索設定ファイルの読み込み
    let searchConditionList: searchConditionType[] = getSearchConditionObj();

    //検索条件設定登録用データの更新
    let saRegistData = callCreateUpdSearchCondition(searchConditionList, body, caId, caUpdDataObj.updDatas, authResult);

    //データを登録
    errMessage = overWriteData(SEARCHCONDITION_FILE_PATH, JSON.stringify(saRegistData, null, '\t'));

    //登録に失敗
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
