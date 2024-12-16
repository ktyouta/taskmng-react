import { authenticate } from "../Auth/AuthFunction";
import { authInfoType, authType } from "../Auth/Type/AuthType";
import { GENERAL_DETAIL_QUERY_KEY } from "./Const/GeneralConst";
import { getValidMenuAuth } from "./GeneralAuthFunction";
import { getGeneralDataList, getGeneralDetailDataList } from "./GeneralSelectFunction";


/**
 * 汎用詳細データを取得
 * @returns 
 */
export function getGeneralData(req: any, res: any) {

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

    //一般権限以上の権限リストを取得する
    let validAuthList: authType[] = getValidMenuAuth(authResult.userInfo);

    //一般権限以上の権限が存在しない場合
    if (!validAuthList || validAuthList.length === 0) {
        return res
            .status(403)
            .json({ errMessage: "参照可能な画面が存在しないため汎用詳細データを取得できません。" });
    }

    //汎用詳細ファイルの読み込み
    let generalList = getGeneralDataList();

    return res.status(200).json(generalList);
}


/**
 * 汎用詳細データを取得
 * @returns 
 */
export function getGeneralDetailData(req: any, res: any) {

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

    //一般権限以上の権限リストを取得する
    let validAuthList: authType[] = getValidMenuAuth(authResult.userInfo);

    //一般権限以上の権限が存在しない場合
    if (!validAuthList || validAuthList.length === 0) {
        return res
            .status(403)
            .json({ errMessage: "参照可能な画面が存在しないため汎用詳細データを取得できません。" });
    }

    //汎用詳細ファイルの読み込み
    let generalList = getGeneralDataList();

    //クエリパラメータ
    let queryStr = req.query;
    let id = "";

    if (queryStr) {
        id = queryStr[GENERAL_DETAIL_QUERY_KEY] as string;
    }

    if (id) {
        generalList = getGeneralDetailDataList(generalList, id);
    }

    return res.status(200).json(generalList);
}
