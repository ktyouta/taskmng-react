import { useState } from "react";
import { MEMO_VIEW_MODE } from "../Const/MemoConst";


//引数の型
type propsType = {
    viewMode: string,
}

function useMemoHeadMenu(props: propsType) {

    //ラベル表示用パラメータ
    const [diplayMode, setDisplayMode] = useState("");

    /**
     * アイコンのホバーイベント
     */
    const hoverIcon = (mode: string) => {
        setDisplayMode(mode);
    }

    return {
        diplayMode,
        hoverIcon,
        isOnMarkdown: props.viewMode === MEMO_VIEW_MODE.markdownOnly,
        isOnMultiView: props.viewMode === MEMO_VIEW_MODE.multiView,
        isOnTextArea: props.viewMode === MEMO_VIEW_MODE.textareaOnly,
    }
}

export default useMemoHeadMenu;