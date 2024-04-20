import { getNowDate } from "../Common/Function";
import { authInfoType } from "../Auth/Type/AuthType";
import { memoListType, memoRegistReqType, tagListType } from "./Type/MemoType";
import { createMemoNewId, createTagNewId } from "./MemoSelectFunction";
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


/**
 * タグ登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddMemoTagData(fileDataObj: tagListType[], body: memoRegistReqType, authResult: authInfoType)
    : tagListType[] {

    //現在日付を取得
    const nowDate = getNowDate();
    let tagList = body.tagList;

    let addTagList = tagList.reduce((current: tagListType[], element) => {
        let tag = fileDataObj.find((element1) => {
            return element1.id === element.value;
        });

        //タグが既に存在する場合は登録しない
        if (tag) {
            return current;
        }
        current.push(
            {
                //新しいIDを割り当てる
                id: createTagNewId(fileDataObj),
                name: "",
                registerTime: nowDate,
                updTime: nowDate,
                userId: authResult.userInfo ? authResult.userInfo?.userId : "",
                deleteFlg: "0"
            }
        );

        return current;
    }, []);

    return [...fileDataObj, ...addTagList];
}