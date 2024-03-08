import { authenticate } from "../Auth/AuthFunction";
import { getGeneralDataList, getGeneralDetailDataList } from "./GeneralSelectFunction";


/**
 * 汎用詳細データを取得
 * @returns 
 */
export function getGeneralData(req: any, res: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //汎用詳細ファイルの読み込み
    let generalList = getGeneralDataList();
    return res.status(200).json(generalList);
}


/**
 * 汎用詳細データを取得
 * @returns 
 */
export function getGeneralDetailData(req: any, res: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //汎用詳細ファイルの読み込み
    let generalList = getGeneralDataList();
    let generalDetail = getGeneralDetailDataList(generalList, id);

    return res.status(200).json(generalDetail);
}
