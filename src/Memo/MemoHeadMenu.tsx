import React, { useState } from 'react';
import '../App.css';
import MemoContent from './MemoContent';
import { displayMemoListType, memoContentDisplayType, memoListType } from './Type/MemoType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/MemoList.css';
import { HeightDiv, VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import useMemoList from './Hook/useMemoList';
import styled from 'styled-components';
import Loading from '../Common/Loading';
import CenterLoading from '../Common/CenterLoading';


//引数の型
type propsType = {
    height: string,
    width: string,
}


//ヘッダメニューのスタイル
const MemoHeadMenuDiv = styled.div<{ height: string, width: string, }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    background-color:white;
`;


function MemoHeadMenu(props: propsType) {

    console.log("MemoHeadMenu render");

    return (
        <MemoHeadMenuDiv
            height={props.height}
            width={props.width}
        >
            本文
        </MemoHeadMenuDiv>
    );
}

export default MemoHeadMenu;