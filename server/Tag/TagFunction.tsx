import { getGeneralDetailData } from "../General/GeneralFunction";
import { authenticate } from "../Auth/AuthFunction";
import { convTagList, getFilterdTag } from "./TagSelectFunction";
import { tagListResType, tagListType } from "./Type/TagType";
import { authInfoType } from "../Auth/Type/AuthType";



/**
 * タグリストの取得
 */
export function getTagList(res: any, req: any) {

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
