import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MEMO_DISPLAY_NUM, MEMO_EDIT_PATH } from '../Const/MemoConst';
import { useAtomValue, useSetAtom } from "jotai";
import { memoListAtom, orgMemoListAtom } from "../Atom/MemoAtom";


//引数の型
type propsType = {
    path: string,
}

function useMemoFooter(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();
    //APIから取得したメモリスト
    const orgMemoList = useAtomValue(orgMemoListAtom);
    //メモリスト
    const setMemoList = useSetAtom(memoListAtom);

    /**
     * メモ作成ボタン押下イベント
     */
    const clickCreateBtn = () => {
        navigate(`${props.path}/${MEMO_EDIT_PATH}`);
    };

    /**
     * ページの切り替えイベント
     */
    const changePage = (nowPage: number) => {
        if (!orgMemoList) {
            return;
        }

        let tmpOrgMemoList = JSON.parse(JSON.stringify(orgMemoList));
        setMemoList(tmpOrgMemoList.slice(nowPage * MEMO_DISPLAY_NUM, nowPage * MEMO_DISPLAY_NUM + MEMO_DISPLAY_NUM));
    };

    return {
        clickCreateBtn,
        pageNum: orgMemoList ?
            orgMemoList.length / MEMO_DISPLAY_NUM
            : 0,
        changePage
    }
}

export default useMemoFooter;