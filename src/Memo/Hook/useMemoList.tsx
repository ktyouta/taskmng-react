import { createRef, ReactNode, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { memoContentDisplayType, memoListType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import MemoContent from "../MemoContent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import styled from "styled-components";
import CenterLoading from "../../Common/CenterLoading";


const MemoListLi = styled.li`
    list-style: none;
    padding: 0% 5% 0% 2%
`;

//引数の型
type propsType = {
    displayMemoList: memoContentDisplayType[] | null,
    isLoading: boolean,
}


/**
 * useMemoConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoList(props: propsType) {

    //メモのコンテンツリスト
    let memoContentList: ReactNode = useMemo(() => {
        //メモリスト表示までのローディング
        if (props.isLoading) {
            return <CenterLoading />;
        }

        if (!props.displayMemoList) {
            return <CenterLoading />;
        }

        //検索結果が0件
        if (props.displayMemoList.length === 0) {
            return <div>検索結果がありません。</div>;
        }

        //メモデータから画面表示用domを作成
        return props.displayMemoList.map((element, index) => {
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
    }, [props.displayMemoList]);

    return {
        memoContentList
    }
}

export default useMemoList;