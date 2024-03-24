import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { MEMO_EDIT_PATH } from '../Const/MemoConst';


//引数の型
type propsType = {
    path: string,
}

function useMemoFooter(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();

    /**
     * メモ作成ボタン押下イベント
     */
    const clickCreateBtn = () => {
        navigate(`${props.path}/${MEMO_EDIT_PATH}`);
    };

    return {
        clickCreateBtn
    }
}

export default useMemoFooter;