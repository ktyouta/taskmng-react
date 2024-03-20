import { RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { generalDataType, masterDataListType, selectedMasterDataType } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import { masterDataListAtom } from "../../Main/Hook/useMainLogic";
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
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //データの取得に失敗した場合のメッセージ
    const [errMessage, setErrMessage] = useState(``);
    //更新用メモID
    const [updMemoId, setUpdMemoId] = useState(``);
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

    //モーダルオープン
    const openModal = (id: string) => {
        //IDが存在しない
        if (!id) {
            setUpdMemoId(``);
            alert(`データの取得に失敗しました。`);
            return;
        }
        //更新用メモ取得ID
        setUpdMemoId(id)
        onFlag();
    };

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
        return createMemoContentList(memoList, generalDataList, memoContentSetting, openModal, moveMemoDetail);
    }, [memoList, generalDataList, memoContentSetting]);

    return {
        isModalOpen,
        offFlag,
        displayMemoList,
        errMessage,
        updMemoId,
        isLoading,
    };
}

export default useMemoListContent;