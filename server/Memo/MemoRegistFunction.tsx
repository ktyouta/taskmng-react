import { getNowDate } from "../Common/Function";
import { authInfoType } from "../Auth/Type/AuthType";
import { memoListType, memoRegistReqType } from "./Type/MemoType";
import { createMemoNewId } from "./MemoSelectFunction";
import { FLG } from "../Common/Const/CommonConst";


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddMemoData(fileDataObj: memoListType[], body: memoRegistReqType, authResult: authInfoType)
    : memoListType[] {

    //現在日付を取得
    const nowDate = getNowDate();

    //リクエストボディ
    let newMemo: memoListType = {
        //新しいIDを割り当てる
        id: createMemoNewId(fileDataObj),
        title: body.title,
        content: body.content,
        registerTime: "",
        updTime: "",
        limitTime: "",
        userId: "",
        deleteFlg: "",
        status: body.status,
    };

    newMemo.registerTime = nowDate;
    newMemo.updTime = nowDate;
    newMemo.userId = authResult.userInfo ? authResult.userInfo?.userId : "";
    newMemo.deleteFlg = FLG.off;

    fileDataObj.push(newMemo);

    return fileDataObj;
}