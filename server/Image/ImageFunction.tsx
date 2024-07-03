import { getGeneralDetailData } from "../General/GeneralFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";
import { inputSettingType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { imageListResType, imageListType } from "./Type/ImageType";
import { convImage, convImageDetail, filterImageQuery, getFilterdImage, getImageObj } from "./ImageSelectFunction";
import { IMAGE_FILEPATH } from "./Const/ImageConst";
import { tagListType } from "../Tag/Type/TagType";
import { TAG_FILEPATH } from "../Tag/Const/TagConst";
import { getFilterdTag, getTagObj } from "../Tag/TagSelectFunction";
import { getUserInfoData } from "../Setting/User/UserSelectFunction";



/**
 * 画像リストの取得
 */
export function getImageList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //クエリストリング
    let queryStr = req.query;

    //画像リストファイルの読み込み
    let decodeFileData: imageListType[] = getFilterdImage();

    //画面返却用の型に変換
    let resImageList: imageListResType[] = convImage(decodeFileData);

    //クエリストリングでフィルター
    resImageList = filterImageQuery(resImageList, queryStr);

    //該当データなし
    if (resImageList.length === 0) {
        return res.status(200).json(resImageList);
    }

    return res.status(200).json(resImageList);
}

/**
 * 画像詳細の取得
 */
export function getImageDetail(res: any, req: any, id: string) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }
    //メモファイルの読み込み
    let decodeFileData: imageListType[] = getFilterdImage();

    //該当データなし
    if (decodeFileData.length === 0) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //詳細を取得
    let imageDetail = decodeFileData.find((element) => { return element.id === id });
    if (!imageDetail) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    //画面返却用の型に変換
    let resImageList: imageListResType = convImageDetail(imageDetail);

    return res.status(200).json(resImageList);
}