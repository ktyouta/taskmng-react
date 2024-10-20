import { taskHistoryType } from "../../Home/Type/HomeType";
import { DATALIST_LEN_ZERO, UN_READ_NUM_ZERO, UNREAD_NUM_CONNECT, UNREAD_NUM_KEY } from "../Const/HeaderConst";
import { localSaveUnReadObjType, unReadObjType } from "../Type/HeaderType";

/**
 * 未読件数をローカルストレージに保存する
 */
export function setUnreadCount(num: string, userId: string) {

    localStorage.setItem(`${UNREAD_NUM_KEY}-${userId}`, num);
}

/**
 * ローカルストレージから未読件数情報を取得してリストで返却
 */
export function getUnReadNumInfo(userId: string): unReadObjType {

    //未読件数情報初期化用
    const INIT_NOWDIFF_INFO = `${UN_READ_NUM_ZERO}${UNREAD_NUM_CONNECT}${DATALIST_LEN_ZERO}`;

    //ローカルストレージから未読件数情報を取得する
    let nowDiffInfo = localStorage.getItem(`${UNREAD_NUM_KEY}-${userId}`);

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
        diff: parseInt(nowDiffInfoArr[0]),
        listLen: parseInt(nowDiffInfoArr[1]),
    };
}

/**
 * 取得したデータから未読件数情報を作成する
 */
export function createNewUnReadInfo(
    nowDiffInfoArr: unReadObjType, data: taskHistoryType[]): localSaveUnReadObjType {

    //ローカルストレージに保存された未読件数
    let nowDiff = nowDiffInfoArr.diff;
    //ローカルストレージに保存されたデータ件数
    let nowListLen = nowDiffInfoArr.listLen;
    //前回データ取得時との差分
    let preDiffLen = 0;

    //前回取得分の作業リストとの差分を取得する
    preDiffLen = data.length - nowListLen;
    //前回差分が1件以上かつローカルストレージに保存されたデータ件数が1件以上の場合
    let isPreDiffLenZero = preDiffLen > 0 && nowListLen > 0;
    //データ取得後の差分
    let latestDiff = nowDiff + (isPreDiffLenZero ? preDiffLen : 0);
    //今回取得したデータ件数
    let latestDataLen = data.length;

    return {
        diff: latestDiff,
        listLen: latestDataLen,
        unReadInfo: `${latestDiff}${UNREAD_NUM_CONNECT}${latestDataLen}`,
        preDiff: preDiffLen
    }
}