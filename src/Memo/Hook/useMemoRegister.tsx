import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { memoRegistReqType, tagListResType } from "../Type/MemoType";
import { MEMO_STATUS } from "../Const/MemoConst";
import useMemoRegisterCommon from "./useMemoRegisterCommon";
import { tagType } from "../../Common/TagsComponent";


//引数の型
type propsType = {
    path: string,
    initMemoTagList: tagType[],
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoRegister(props: propsType) {

    //メモタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモ内容
    const [memoContent, setMemoContent] = useState("");
    //メモタグリスト
    const [memoTagList, setMemoTagList] = useState<tagType[]>([]);
    //タグのサジェスト用リスト
    const [tagSuggestList, setTagSuggestList] = useState<tagListResType[]>([]);

    //登録関連の共通処理を取得
    const {
        isRegistLoading,
        backPageButtonFunc,
        create,
        save,
        clearButtonFunc,
        addTag,
        deleteTag,
    } = useMemoRegisterCommon({
        ...props,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        memoTagList,
        setMemoTagList,
        setTagSuggestList,
    });

    return {
        isRegistLoading,
        backPageButtonObj: {
            title: `戻る`,
            type: `GRAD_GRAY`,
            onclick: backPageButtonFunc
        } as buttonObjType,
        positiveButtonObj: {
            title: `登録`,
            type: `GRAD_BLUE`,
            onclick: create
        } as buttonObjType,
        saveButtonObj: {
            title: `下書き保存`,
            type: `GRAD_BLUE`,
            onclick: save
        } as buttonObjType,
        clearButtonObj: {
            title: `元に戻す`,
            type: `GRAD_BLUE`,
            onclick: clearButtonFunc
        } as buttonObjType,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        addTag,
        deleteTag,
        memoTagList,
        tagSuggestList,
    }
}

export default useMemoRegister;