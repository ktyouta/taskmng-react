import { ReactNode, RefObject, createRef, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchJsonData from "../../Common/Hook/useFetchJsonData";
import { comboType, masterDataListType, refConditionType, refInfoType, } from "../../Common/Type/CommonType";
import ENV from '../../env.json';
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { useGlobalAtomValue } from "../../Common/Hook/useGlobalAtom";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import { memoSearchConditionType, tagListResType } from "../Type/MemoType";
import { refType } from "../../Common/BaseInputComponent";
import useSwitch from "../../Common/Hook/useSwitch";
import useGetGeneralDataList from "../../Common/Hook/useGetGeneralDataList";
import SpaceComponent from "../../Common/SpaceComponent";
import React from "react";
import { parseStrDate } from "../../Common/Function/Function";
import useCreateDefaultMemoUrlCondition from "./useCreateDefaultMemoUrlCondition";
import { createDisplayTagList, createMemoSearchUrl, createSearchDispCondition, createSearchRefArray } from "../Function/MemoFunction";
import { memoListUrlAtom, memoSearchConditionObjAtom, selectedTagListAtom } from "../Atom/MemoAtom";
import { MEMO_SEARCHCONDITION_URL, MEMO_SEARCH_URL, SEARCHCONDITION_KEY_CUSTOM, SEARCHCONDITION_KEY_DEFAULT, SEARCHCONDITION_QUERY_KEY, TAG_QUERY_KEY } from "../Const/MemoConst";



/**
 * MemoSearchコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoSearch() {

    //メモリスト取得用URL
    const setMemoListUrl = useSetAtom(memoListUrlAtom);
    //モーダルの開閉用フラグ
    const { flag: isModalOpen, onFlag, offFlag } = useSwitch();
    //検索条件参照用リスト
    const [memoSearchRefInfo, setMemoSearchRefInfo] = useState<refInfoType[]>([]);
    //検索条件用オブジェクト
    const [searchConditionObj, setSearchConditionObj] = useAtom(memoSearchConditionObjAtom);
    //選択中のタグリスト
    const [selectedTagList, setSelectedTagList] = useAtom(selectedTagListAtom);


    //検索条件の設定リスト
    const { data: memoSearchConditionList } = useQueryWrapper<memoSearchConditionType[]>({
        url: MEMO_SEARCHCONDITION_URL,
    });

    /**
     * 初期表示メモ取得用URLと検索条件オブジェクトの作成
     */
    const { createDefaultUrlCondition } = useCreateDefaultMemoUrlCondition(memoSearchConditionList);

    //現在の検索条件(画面表示用)
    const displaySearchConditionList = useMemo(() => {
        if (!memoSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件のdomを作成
        return createSearchDispCondition(memoSearchConditionList, searchConditionObj);
    }, [searchConditionObj, memoSearchConditionList]);


    //タグ選択時にタグを削除する
    const deleteTag = (selectTag: tagListResType) => {
        let tmpSelectedTagList = selectedTagList.filter((element) => {
            return element.label !== selectTag.label;
        });

        setMemoListUrl(createMemoSearchUrl(searchConditionObj, tmpSelectedTagList));
        setSelectedTagList(tmpSelectedTagList);
    };


    //選択中のタグ(画面表示用)
    const displayTagList = useMemo(() => {
        if (!selectedTagList) {
            return;
        }

        //選択タグのdomを作成
        return createDisplayTagList(selectedTagList, deleteTag);
    }, [selectedTagList]);


    /**
     * 検索ボタン押下
     */
    function clickSearchBtn() {
        //URLを更新
        setMemoListUrl(createMemoSearchUrl(searchConditionObj, selectedTagList));
    }

    /**
     * クリアボタン押下
     */
    function clickClearBtn() {
        createDefaultUrlCondition();
    }

    /**
     * モーダルオープンイベント
     */
    function openModal() {
        if (!memoSearchConditionList) {
            return;
        }
        if (!searchConditionObj) {
            return;
        }

        //検索条件の参照を作成
        setMemoSearchRefInfo(createSearchRefArray(memoSearchConditionList, searchConditionObj, selectedTagList));
        onFlag();
    }

    /**
     * モーダルクローズイベント
     */
    function closeModal() {
        if (!memoSearchRefInfo) {
            offFlag();
        }
        //検索条件を保存する
        let tmpCondition: { [key: string]: string } = {};
        memoSearchRefInfo.forEach((element) => {
            if (!element.ref.current) {
                return true;
            }
            //タグは別のステートで管理しているためスキップ
            if (element.id === TAG_QUERY_KEY) {
                return true;
            }

            tmpCondition[element.id] = element.ref.current.refValue;
        });

        //タグ(検索条件)の入力値を取得
        let tagInput = memoSearchRefInfo.find((element) => {
            return element.id === TAG_QUERY_KEY;
        });

        //タグが入力されている場合はリストに変換してステートにセットする
        if (tagInput && tagInput.ref.current && tagInput.ref.current.refValue.trim()) {
            setSelectedTagList(tagInput.ref.current.refValue.split(" ").reduce((prev: tagListResType[], current: string) => {

                //重複したラベルを省く
                if (prev.some((element) => {
                    return element.label === current;
                })) {
                    return prev;
                }

                //空文字を省く
                if (!current.trim()) {
                    return prev;
                }

                return [...prev, {
                    label: current,
                    value: ""
                }];
            }, []));
        }

        setSearchConditionObj(tmpCondition);
        offFlag();
    }

    return {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        memoSearchRefInfo,
        displaySearchConditionList,
        displayTagList,
    };
}

export default useMemoSearch;