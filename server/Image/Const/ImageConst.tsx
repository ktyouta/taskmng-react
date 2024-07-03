import { JSONEXTENSION, IMAGEFILENM, TRANSACTION, IMAGE_FOLDER_PATH, ORIGINAL_IMAGE_PATH, STANDARD_IMAGE_PATH } from "../../Common/Const/CommonConst";

//画像ファイルリストのパス
export const IMAGE_FILEPATH = `${TRANSACTION}${IMAGEFILENM}${JSONEXTENSION}`;
//画像の種類
export const IMAGE_TYPE = {
    //スタンダード
    standard: "0",
    //オリジナル
    original: "1",
}
//画像フォルダ(スタンダード)
export const IMAGE_FOLDER_STAND = `${IMAGE_FOLDER_PATH}${STANDARD_IMAGE_PATH}`;
//画像フォルダ(オリジナル)
export const IMAGE_FOLDER_ORIGINAL = `${IMAGE_FOLDER_PATH}${ORIGINAL_IMAGE_PATH}`;