import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import { memoContentDisplayType, memoContentSettingType, memoListType, tagListResType } from "../Type/MemoType";
import React from "react";
import MemoContent from "../MemoContent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import styled from "styled-components";
import CenterLoading from "../../Common/CenterLoading";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import ENV from '../../env.json';
import { useNavigate } from "react-router-dom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { detailRoutingIdAtom, memoListUrlAtom, memoSearchConditionObjAtom, selectedTagListAtom } from "../Atom/MemoAtom";
import { createMemoContentList, createMemoSearchUrl } from "../Function/MemoFunction";


const MemoListLi = styled.li`
    list-style: none;
    padding: 0% 5% 0% 2%
`;

//引数の型
type propsType = {
    path: string,
    memoList: memoListType[] | undefined
}


/**
 * useMemoConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoList(props: propsType) {

    //ルーティング用
    const navigate = useNavigate();
    //詳細画面へのルーティング用ID
    const setDetailRoutingId = useSetAtom(detailRoutingIdAtom);
    //選択中のタグリスト
    const [selectedTagList, setSelectedTagList] = useAtom(selectedTagListAtom);
    //最後に選択したタグ
    const selectTagLabel = useRef("");
    //検索条件用オブジェクト
    const searchConditionObj = useAtomValue(memoSearchConditionObjAtom);
    //メモリスト取得用URL
    const setMemoListUrl = useSetAtom(memoListUrlAtom);

    //メモの詳細画面に遷移する
    const moveMemoDetail = (memoId: string,) => {
        setDetailRoutingId(memoId);
        navigate(`${props.path}/${memoId}`);
    };


    //コンテンツのタグの選択イベント
    const selectContentTag = (selectTag: tagListResType) => {

        //重複するタグは追加しない
        if (selectedTagList.some((element) => {
            return element.value === selectTag.value && element.label === selectTag.label;
        })) {

            if (selectTagLabel.current === selectTag.label) {
                alert("同名のタグは選択できません。");
                return;
            }

            selectTagLabel.current = selectTag.label;
            return;
        }

        selectTagLabel.current = "";
        let tmpSelectedTagList = [...selectedTagList, selectTag];
        setMemoListUrl(createMemoSearchUrl(searchConditionObj, tmpSelectedTagList));
        setSelectedTagList(tmpSelectedTagList);
    }


    //メモのコンテンツリストのDOM
    const memoContentListDom: ReactNode = useMemo(() => {
        //メモリスト表示までのローディング
        if (!props.memoList) {
            return <CenterLoading />;
        }

        //検索結果が0件
        if (props.memoList.length === 0) {
            return <div>検索結果がありません。</div>;
        }

        //メモのコンテンツリスト
        let memoContentList: memoContentDisplayType[] = createMemoContentList(props.memoList, moveMemoDetail, selectContentTag);

        //メモデータから画面表示用domを作成
        return memoContentList.map((element, index) => {
            let id = element.id as string;
            return (
                <React.Fragment key={`memolist-${id}-${index}`}>
                    <MemoListLi key={`li-${id}`}>
                        <MemoContent
                            key={`content-${id}`}
                            contentObj={element}
                        />
                    </MemoListLi>
                    <VerticalSpaceComponent
                        key={`verticalspace-${id}`}
                        space='2%'
                    />
                </React.Fragment>
            );
        });
        //selectContentTag内でデータ更新後のselectedTagListとsearchConditionObjを使用するために条件に追加
    }, [props.memoList, selectedTagList, searchConditionObj]);

    return {
        memoContentListDom
    }
}

export default useMemoList;