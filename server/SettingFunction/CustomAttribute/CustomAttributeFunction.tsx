import { authenticate } from "../../AuthFunction";
import {
    CUSTOMATTRIBUTE,
    JSONEXTENSION,
    TRANSACTION,
    CUSTOMATTRIBUTELIST
} from "../../Constant";
import { getFileJsonData, overWriteData, readFile } from "../../FileFunction";
import { checkUpdAuth } from "../../MasterDataFunction";
import { authInfoType, customAttributeListType, customAttributeType, taskListType } from "../../Type/type";
import { getNowDate } from "../../CommonFunction";
import { callCreateAddSearchCondition, createAddCustomAttribute, createAddCustomAttributeList, runCreateSelectList } from "./CustomAttributeRegistFunction";
import { createDeleteCustomAttribute, createDeleteCustomAttributeList, runDeleteSelectList } from "./CustomAttributeDeleteFunction";
import { createUpdCustomAttribute, createUpdCustomAttributeList, runUpdSelectList } from "./CustomAttributeUpdateFunction";
import { filterCustomAttributeDetail, getCustomAttributeData, getCustomAttributeListData, joinCustomAttributeList } from "./CustomAttributeSelectFunction";
import { searchConditionType } from "../../SearchCondition/Type/SearchConditionType";
import { getSearchConditionList, getSearchConditionObj } from "../../SearchCondition/SearchConditionSelectFunction";
import { SEARCHCONDITION_FILE_PATH } from "../../SearchCondition/SearchConditionFunction";


//カスタム属性ファイルのパス
export const CUSTOM_ATTRIBUTE_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTE}${JSONEXTENSION}`;
//カスタム属性リストファイルのパス
export const CUSTOM_ATTRIBUTE_SELECTLIST_FILEPATH = `${TRANSACTION}${CUSTOMATTRIBUTELIST}${JSONEXTENSION}`;
//カスタム属性IDの接頭辞
export const PRE_CUSTOMATTRIBUTE_ID = `ATTRIBUTEID-`;
//カスタム属性リストIDの接頭辞
export const PRE_CUSTOMATTRIBUTELIST_ID = `ATTRIBUTELISTID-`;

//カスタム属性の選択リストの登録メソッドの戻り値
export type registSelectListRetType = {
    errMsg: string,
    registSelectList: customAttributeListType[]
}


/**
 * カスタム属性の取得
 */
export function getCustomAttribute(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
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
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //カスタム属性の読み込み
    let decodeFileData: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!decodeFileData || decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    return filterCustomAttributeDetail(decodeFileData, id, res);
}

/**
 * カスタム属性入力値設定の取得
 */
export function getCustomAttributeInputSetting(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return authResult;
    }

    //カスタム属性の読み込み
    let customAttributeList: customAttributeType[] = getCustomAttributeData();

    //データなし
    if (!customAttributeList || customAttributeList.length === 0) {
        return res.status(400).json({ errMessage: `カスタム属性が登録されていません。` });
    }

    //カスタム属性選択リストの読み込み
    let customAttributeSelectList = getCustomAttributeListData();

    //選択リストと結合する
    let retCustomAttributeList = joinCustomAttributeList(customAttributeList, customAttributeSelectList);

    return res.status(200).json(retCustomAttributeList);
}


/**
 * カスタム属性の登録
 */
export function runAddCustomAttribute(res: any, req: any) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //リクエストボディ
    let body: customAttributeType = req.body;

    //カスタム属性ファイルの読み込み
    let caDecodeFileData: customAttributeType[] = getFileJsonData(CUSTOM_ATTRIBUTE_FILEPATH);

    //カスタム属性の登録用データの作成
    let caRegistDataObj = createAddCustomAttribute(caDecodeFileData, body, authResult);

    //データを登録
    let errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(caRegistDataObj.registData, null, '\t'));

    //登録に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //カスタム属性リストのIDが存在する場合はリストを登録する
    let selectList: string[] = body.selectElementList ?? [];
    selectList = selectList.filter((element) => {
        //空欄は登録しない
        return element !== "";
    });

    let registListFlg: boolean = selectList && selectList.length > 0;

    //カスタム属性リストを登録
    if (registListFlg) {
        errMessage = runCreateSelectList(caRegistDataObj.registData, selectList, authResult);

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
        caRegistDataObj.customAttributeId, caRegistDataObj.registData, authResult);

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
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!caId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
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

    //削除データの作成
    let delCaData = createDeleteCustomAttribute(caDecodeFileData, caId);

    //データを削除
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(delCaData, null, '\t'));

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
 * カスタム属性の更新
 */
export function runUpdCustomAttribute(res: any, req: any, caId: string) {
    //認証権限チェック
    let authResult = checkUpdAuth(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //IDの指定がない
    if (!caId) {
        return res
            .status(400)
            .json({ errMessage: `パラメータが不正です。` });
    }

    let errMessage = "";

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
    let updCaData = createUpdCustomAttribute(caDecodeFileData, req.body, caId);

    //データを更新
    errMessage = overWriteData(CUSTOM_ATTRIBUTE_FILEPATH, JSON.stringify(updCaData, null, '\t'));
    //更新に失敗
    if (errMessage) {
        return res
            .status(500)
            .json({ errMessage });
    }

    //選択形式の場合はリストの追加更新をする
    let type = req.body.type;
    if (type === "select" || type === "radio" || type === "checkbox") {
        //選択リストの追加および更新
        errMessage = runUpdSelectList(updCaData, filterdCaData, req, caId, authResult);

        //リストの更新に失敗
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
