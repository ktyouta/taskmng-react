import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { generalDataType, masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { displayMemoListType, memoContentDisplayType, memoContentSettingType, memoListType } from "../Type/MemoType";
import { refType } from "../../Common/BaseInputComponent";
import useQueryClientWapper from "../../Common/Hook/useQueryClientWrapper";
import useSwitch from "../../Common/Hook/useSwitch";
import ButtonComponent from "../../Common/ButtonComponent";
import { parseStrDate } from "../../Common/Function/Function";
import { createMemoContentList } from "../Function/MemoFunction";
import { detailRoutingIdAtom, memoListUrlAtom } from "../Atom/MemoAtom";



//引数の型
type propsType = {
    path: string,
}


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoListContent(props: propsType) {

    //メモリスト取得用URL
    const memoListUrl = useAtomValue(memoListUrlAtom);
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //汎用詳細リスト
    const { data: generalDataList } = useQueryWrapper<generalDataType[]>({
        url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}`,
    });
    //ルーティング用
    const navigate = useNavigate();

    //メモリストを取得
    const { data: memoList, isLoading } = useQueryWrapper<memoListType[]>(
        {
            url: memoListUrl,
            afSuccessFn: () => { }
        }
    );

    //メモの画面表示設定を取得
    const { data: memoContentSetting } = useQueryWrapper<memoContentSettingType[]>(
        {
            url: `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.MEMOCONTENTSETTING}`,
        }
    );


    //メモの詳細画面に遷移する
    const moveMemoDetail = (memoId: string,) => {
        setDetailRoutingId(memoId);
        navigate(`${props.path}/${memoId}`);
    };

    //取得したメモリストを画面表示用に変換
    const displayMemoList = useMemo(() => {
        //メモリスト
        if (!memoList) {
            return null;
        }
        //汎用リスト
        if (!generalDataList) {
            return null;
        }
        //メモの画面表示設定リスト
        if (!memoContentSetting) {
            return null;
        }

        //コンテンツリストを作成
        return createMemoContentList(memoList, memoContentSetting, moveMemoDetail);
    }, [memoList, generalDataList, memoContentSetting]);

    return {
        displayMemoList,
        isLoading,
    };
}

export default useMemoListContent;