import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { apiMemoDetailType, memoListType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody, requestBodyInputCheck } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import { useSetAtom } from "jotai";
import { detailRoutingIdAtom } from "../Atom/MemoAtom";
import { DUMMY_ID } from "../Const/MemoConst";


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
    //入力欄設定リスト
    const { memoSettingList } = useGetMemoInputSetting();
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //メモのタイトル
    const [memoTitle, setMemoTitle] = useState("");
    //メモの内容
    const [memoContent, setMemoContent] = useState("");

    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });

    //モーダル展開時に更新用メモを取得
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

    /**
     * 編集ボタン押下処理
     */
    const openEditPage = () => {
        setViewMode(2);
    }

    /**
     * 戻るボタン押下処理(閲覧モードに切り替え)
     */
    const openViewPage = () => {
        setViewMode(1);
    }

    return {
        updMemo,
        generalDataList,
        memoSettingList,
        viewMode,
        openViewPage,
        openEditPage,
        memoTitle,
        setMemoTitle,
        memoContent,
        setMemoContent,
        isLoadinGetUpdMemo,
    }
}

export default useMemoDetail;