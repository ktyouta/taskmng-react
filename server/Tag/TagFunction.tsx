import { getGeneralDetailData } from "../General/GeneralFunction";
import { runAddTaskHistory } from "../History/HistoryFunction";
import { authenticate, checkUpdAuth } from "../Auth/AuthFunction";
import { convTagList, getFilterdTag } from "./TagSelectFunction";
import { tagListResType, tagListType } from "./Type/TagType";



/**
 * タグリストの取得
 */
export function getTagList(res: any, req: any) {
    //認証チェック
    let authResult = authenticate(req.cookies.cookie);
    if (authResult.errMessage) {
        return res
            .status(authResult.status)
            .json({ errMessage: authResult.errMessage });
    }

    //タグファイルの読み込み
    let decodeFileData: tagListType[] = getFilterdTag();

    //画面返却用の型に変換
    let resTagList: tagListResType[] = convTagList(decodeFileData);

    //該当データなし
    if (resTagList.length === 0) {
        return res.status(400).json({ errMessage: `該当データがありません。` });
    }

    return res.status(200).json(resTagList);
}
