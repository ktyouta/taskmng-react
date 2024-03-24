import { authInfoType } from "../Auth/Type/AuthType";
import { getNowDate } from "../Common/Function";
import { memoListType, memoUpdReqType, retCreateUpdMemoType } from "./Type/MemoType";

/**
 * 削除用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createDelMemoData(memoList: memoListType[], updMemoId: string, authResult: authInfoType)
    : retCreateUpdMemoType {

    let retObj: retCreateUpdMemoType = {
        errMessage: "",
        memoList: memoList
    };

    //現在日付を取得
    const nowDate = getNowDate();

    //更新用メモを取得
    let delMemo = memoList.find((element) => {
        return element.id === updMemoId;
    });

    if (!delMemo) {
        retObj.errMessage = "削除対象のメモがありません。"
        return retObj;
    }

    delMemo.updTime = nowDate;
    delMemo.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    delMemo.deleteFlg = "1";
    retObj.memoList = memoList;

    return retObj;
}