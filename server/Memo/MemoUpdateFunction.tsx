import { authInfoType } from "../Auth/Type/AuthType";
import { getNowDate } from "../Common/Function";
import { memoListType, memoUpdReqType, retCreateUpdMemoType, tagListType } from "./Type/MemoType";

/**
 * 更新用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createUpdMemoData(memoList: memoListType[], body: memoUpdReqType,
    updMemoId: string, tagDataObj: tagListType[], authResult: authInfoType)
    : retCreateUpdMemoType {

    let retObj: retCreateUpdMemoType = {
        errMessage: "",
        memoList: memoList
    };

    //現在日付を取得
    const nowDate = getNowDate();

    //更新用メモを取得
    let updMemo = memoList.find((element) => {
        return element.id === updMemoId;
    });

    if (!updMemo) {
        retObj.errMessage = "更新対象のメモがありません。"
        return retObj;
    }

    updMemo.title = body.title;
    updMemo.content = body.content;
    updMemo.updTime = nowDate;
    updMemo.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    updMemo.status = body.status;
    retObj.memoList = memoList;

    let bodyTagList = body.tagList;

    //タグリストのIDを取得
    let tagIdList = bodyTagList.reduce((prev: string[], current) => {
        let tagData = tagDataObj.find((element) => {
            return element.label === current.label;
        });

        if (!tagData) {
            return prev;
        }

        prev.push(tagData.id);

        return prev;
    }, []).join(",");

    updMemo.tagId = tagIdList;

    return retObj;
}