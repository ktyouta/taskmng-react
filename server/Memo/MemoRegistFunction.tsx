import { getNowDate } from "../Common/Function";
import { authInfoType } from "../Auth/Type/AuthType";
import { memoListType, memoRegistReqType, retCreateAddMemoDataType } from "./Type/MemoType";
import { createMemoNewId, createTagNewId } from "./MemoSelectFunction";
import { FLG } from "../Common/Const/CommonConst";
import { tagType } from "../Common/Type/CommonType";
import { tagListType } from "../Tag/Type/TagType";


/**
 * 登録用データの作成
 * @param filePath 
 * @param stream 
 * @returns 
 */
export function createAddMemoData(fileDataObj: memoListType[], tagDataObj: tagListType[],
    body: memoRegistReqType, authResult: authInfoType)
    : retCreateAddMemoDataType {

    //現在日付を取得
    const nowDate = getNowDate();
    let newId = createMemoNewId(fileDataObj);
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

    //リクエストボディ
    let newMemo: memoListType = {
        //新しいIDを割り当てる
        id: newId,
        tagId: tagIdList,
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
    newMemo.deleteFlg = FLG.OFF;
    fileDataObj.push(newMemo);

    return {
        memoList: fileDataObj,
        newId: newId
    };
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

    //タグの重複削除
    tagList = tagList.reduce((prev: tagType[], current) => {
        if (prev.some((element2) => {
            return element2.value === current.value;
        })) {
            return prev;
        }
        return [...prev, current];
    }, []);

    tagList.forEach((element) => {
        let tag = fileDataObj.find((element1) => {
            return element1.id === element.value;
        });

        //タグが既に存在する場合は登録しない
        if (tag) {
            return;
        }
        fileDataObj.push(
            {
                //新しいIDを割り当てる
                id: createTagNewId(fileDataObj),
                label: element.label,
                registerTime: nowDate,
                updTime: nowDate,
                userId: authResult.userInfo ? authResult.userInfo?.userId : "",
                deleteFlg: "0"
            }
        );
    });

    return fileDataObj;
}