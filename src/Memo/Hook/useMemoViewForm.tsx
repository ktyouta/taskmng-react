import { createRef, RefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import ENV from '../../env.json';
import { bodyObj, comboType, generalDataType, inputMasterSettingType, inputSettingType, refConditionType, refInfoType } from "../../Common/Type/CommonType";
import { refType } from "../../Common/BaseInputComponent";
import useMutationWrapper, { errResType, resType } from "../../Common/Hook/useMutationWrapper";
import useQueryClientWrapper from "../../Common/Hook/useQueryClientWrapper";
import { memoContentDisplayType, memoListType, viewMemoType } from "../Type/MemoType";
import useQueryWrapper from "../../Common/Hook/useQueryWrapper";
import { buttonType } from "../../Common/ButtonComponent";
import { createRequestBody } from "../../Common/Function/Function";
import useGetMemoInputSetting from "./useGetMemoInputSetting";
import React from "react";
import SpaceComponent from "../../Common/SpaceComponent";
import MemoContent from "../MemoContent";
import VerticalSpaceComponent from "../../Common/VerticalSpaceComponent";
import styled from "styled-components";
import HorizonLabelItemComponent from "../../Common/HorizonLabelItemComponent";


//表示欄のスタイル
const ValueSpan = styled.span`
    width:80%
`;

//引数の型
type propsType = {
    viewMemoList: viewMemoType[],
}


/**
 * useMemoConditionコンポーネントのビジネスロジック
 * @param selectedMaster 
 * @returns 
 */
function useMemoViewForm(props: propsType) {

    //メモのコンテンツリスト
    let viewList = useMemo(() => {
        return props.viewMemoList.map((element, index) => {
            return (
                <HorizonLabelItemComponent
                    title={element.title}
                    width="20%"
                    key={`dynamicform-${index}`}
                >
                    <ValueSpan>
                        {element.value}
                    </ValueSpan>
                </HorizonLabelItemComponent>
            );
        });
    }, [props.viewMemoList]);

    return {
        viewList
    }
}

export default useMemoViewForm;