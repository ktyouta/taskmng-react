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
import { detailRoutingIdAtom, memoListAtom, memoListUrlAtom, orgMemoListAtom } from "../Atom/MemoAtom";
import { MEMO_DISPLAY_NUM } from "../Const/MemoConst";


/**
 * MasterTopコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoListContent() {

    //メモリスト取得用URL
    const memoListUrl = useAtomValue(memoListUrlAtom);
    //APIから取得したメモリスト
    const [orgMemoList, setOrgMemoList] = useAtom(orgMemoListAtom);
    //メモリスト
    const [memoList, setMemoList] = useAtom(memoListAtom);

    //メモリストを取得
    useQueryWrapper<memoListType[]>(
        {
            url: memoListUrl,
            afSuccessFn: (data: memoListType[]) => {
                setOrgMemoList(data);
                setMemoList(data.slice(0, MEMO_DISPLAY_NUM));
            }
        }
    );

    return {
        memoList,
        orgMemoList,
    };
}

export default useMemoListContent;