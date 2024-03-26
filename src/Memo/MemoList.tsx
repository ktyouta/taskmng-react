import React, { useState } from 'react';
import '../App.css';
import MemoContent from './MemoContent';
import { displayMemoListType, memoContentDisplayType, memoListType } from './Type/MemoType';
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
    path: string,
    memoList: memoListType[] | undefined
}


function MemoList(props: propsType) {

    console.log("MemoList render");

    const {
        memoContentListDom
    } = useMemoList({ ...props });

    return (
        <VerticalFlowDiv
            height='100%'
        >
            <MemoListUl>
                {memoContentListDom}
            </MemoListUl>
        </VerticalFlowDiv>
    );
}

export default MemoList;