import { JSONEXTENSION, IMAGEFILENM, TRANSACTION } from "../../Common/Const/CommonConst";

//画像ファイルのパス
export const IMAGE_FILEPATH = `${TRANSACTION}${IMAGEFILENM}${JSONEXTENSION}`;
//画像の種類
export const IMAGE_TYPE = {
    //スタンダード
    draft: "0",
    //オリジナル
    regist: "1",
}