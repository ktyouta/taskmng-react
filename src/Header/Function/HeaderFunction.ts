import { UNREAD_NUM_CONNECT, UNREAD_NUM_KEY } from "../Const/HeaderConst";
import { unReadObjType } from "../Type/HeaderType";

/**
 * 未読件数をローカルストレージに保存する
 */
export function setUnreadCount(num: string) {

    localStorage.setItem(UNREAD_NUM_KEY, num);
}

/**
 * ローカルストレージから未読件数情報を取得してリストで返却
 */
export function getUnReadNumInfo(): unReadObjType {

    //未読件数情報初期化用
    const INIT_NOWDIFF_INFO = `0${UNREAD_NUM_CONNECT}0`;

    //ローカルストレージから未読件数情報を取得する
    let nowDiffInfo = localStorage.getItem(UNREAD_NUM_KEY);

    if (!nowDiffInfo) {
        nowDiffInfo = INIT_NOWDIFF_INFO;
    }

    let nowDiffInfoArr = nowDiffInfo.split(UNREAD_NUM_CONNECT);

    //未読件数情報リストチェック
    if (!nowDiffInfoArr || nowDiffInfoArr.length < 2) {
        nowDiffInfoArr = INIT_NOWDIFF_INFO.split(UNREAD_NUM_CONNECT);
    }

    try {
        //バリデーションチェック
        parseInt(nowDiffInfoArr[0]);
        parseInt(nowDiffInfoArr[1]);
    } catch (e) {
        //データ不備の場合は初期化する
        nowDiffInfoArr = INIT_NOWDIFF_INFO.split(UNREAD_NUM_CONNECT);
    }

    return {
        nowDiff: parseInt(nowDiffInfoArr[0]),
        nowListLen: parseInt(nowDiffInfoArr[1])
    };
}