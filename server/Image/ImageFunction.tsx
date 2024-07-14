import { getGeneralDetailData } from "../General/GeneralFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";
import { inputSettingType } from "../Common/Type/CommonType";
import { overWriteData } from "../Common/FileFunction";
import { imageListResType } from "./Type/ImageType";
import { convImage, getIconName } from "./ImageSelectFunction";
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

    //画像名のリストを取得
    let iconNameList = getIconName(queryStr);

    //画面返却用の型に変換
    let resImageList: imageListResType[] = convImage(iconNameList);

    //該当データなし
    if (resImageList.length === 0) {
        return res.status(200).json(resImageList);
    }

    return res.status(200).json(resImageList);
}