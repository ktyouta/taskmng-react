import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { apiMemoDetailType, memoListType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useSetAtom } from "jotai";
import { detailRoutingIdAtom } from "../Atom/MemoAtom";
import { DUMMY_ID } from "../Const/MemoConst";
import { VIEW_MODE } from "../../Common/Const/CommonConst";


//引数の型
type propsType = {
    updMemoId: string,
    closeFn?: () => void,
}


/**
 * useMemoEditコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoDetail(props: propsType) {

    //閲覧モード(1:閲覧 2:編集)
    const [viewMode, setViewMode] = useState(1);
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //メモのタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモの内容
    const [memoContent, setMemoContent] = useState("");

    //詳細画面遷移時に更新用メモを取得
    const { data: updMemo, isLoading: isLoadinGetUpdMemo } = useQueryWrapper<apiMemoDetailType>(
        {
            url: props.updMemoId ? `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMO}/${props.updMemoId}` : ``,
            afSuccessFn: (data: apiMemoDetailType) => {
                setMemoTitle(data.title);
                setMemoContent(data.content);
            }
            , afErrorFn: (res) => {
                let tmp = res as errResType;
                //NotFound画面に遷移
                setDetailRoutingId(DUMMY_ID);
            }
        }
    );

    //メモのタイトルの初期値
    let initMemoTitle = useMemo(() => {
        if (!updMemo) {
            return;
        }
        return updMemo.title;
    }, [updMemo]);

    //メモの内容の初期値
    let initMemoContent = useMemo(() => {
        if (!updMemo) {
            return;
        }
        return updMemo.content;
    }, [updMemo]);

    /**
     * 編集ボタン押下処理
     */
    const openEditPage = () => {
        setViewMode(VIEW_MODE.edit);
    }

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const openViewPage = () => {
        setViewMode(VIEW_MODE.view);
    }

    return {
        updMemo,
        viewMode,
        openViewPage,
        openEditPage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        isLoadinGetUpdMemo,
        initMemoTitle,
        initMemoContent,
    }
}

export default useMemoDetail;