import React, { useState } from 'react';
import '../App.css';
import MemoContent from './MemoContent';
import { displayMemoListType, memoContentDisplayType } from './Type/MemoType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/MemoList.css';
import { VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import useMemoList from './Hook/useMemoList';
import styled from 'styled-components';
import Loading from '../Common/Loading';
import CenterLoading from '../Common/CenterLoading';


const MemoListUl = styled.ul`
    padding-left: 0;
    height: 93%;
`;


//引数の型
type propsType = {
    displayMemoList: memoContentDisplayType[] | null,
    isLoading: boolean,
}


function MemoList(props: propsType) {

    console.log("MemoList render");

    const {
        memoContentList
    } = useMemoList({ ...props });

    return (
        <VerticalFlowDiv
            height='100%'
        >
            <MemoListUl>
                {memoContentList}
            </MemoListUl>
        </VerticalFlowDiv>
    );
}

export default MemoList;