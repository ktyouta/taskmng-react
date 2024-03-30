import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, buttonObjType, comboType, generalDataType, refInfoType } from "../../Common/Type/CommonType";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, customAttributeRequestBodyType, editDisplayMemoType, inputMemoSettingType, memoListType, memoUpdReqType, viewMemoType } from "../Type/MemoType";
import { MEMO_VIEW_MODE } from "../Const/MemoConst";


//引数の型
type propsType = {
    updMemoId: string,
    backFn?: () => void,
    closeFn?: () => void,
    memoTitle: string,
    memoContent: string,
    initMemoTitle: string | undefined,
    initMemoContent: string | undefined,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoEditForm() {

    //編集モード(初期表示はmarkdownとテキストエリアの両方を表示する)
    const [viewMode, setViewMode] = useState(MEMO_VIEW_MODE.multiView);

    /**
     * markdownのみ表示
     */
    const clickMarkdownOnly = () => {
        setViewMode(MEMO_VIEW_MODE.markdownOnly);
    };

    /**
     * テキストエリアのみ表示
     */
    const clickTeaxtAreaOnly = () => {
        setViewMode(MEMO_VIEW_MODE.textareaOnly);
    }

    /**
     * markdownとテキストエリアの両方を表示
     */
    const clickMultiView = () => {
        setViewMode(MEMO_VIEW_MODE.multiView);
    }

    return {
        viewMode,
        clickMarkdownOnly,
        clickTeaxtAreaOnly,
        clickMultiView,
    }
}

export default useMemoEditForm;