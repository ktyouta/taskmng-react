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
import { FaPen } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaRegWindowMaximize } from "react-icons/fa";
import IconComponent from '../Common/IconComponent';
import SpaceComponent from '../Common/SpaceComponent';
import { MEMO_VIEW_MODE } from './Const/MemoConst';


//引数の型
type propsType = {
    height: string,
    width: string,
    viewMode: string,
    clickMarkdownOnly: () => void;
    clickTeaxtAreaOnly: () => void;
    clickMultiView: () => void;
}


//ヘッダメニューのスタイル
const MemoHeadMenuDiv = styled.div<{ height: string, width: string, }>`
    height:${({ height }) => (height)};
    width:${({ width }) => (width)};
    border: 1px solid #a9a9a9;
    border-radius: 6px;
    background-color:white;
    display:flex;
    align-items: center;
`;


function MemoHeadMenu(props: propsType) {

    console.log("MemoHeadMenu render");

    return (
        <MemoHeadMenuDiv
            height={props.height}
            width={props.width}
        >
            本文
            <SpaceComponent
                space={'88%'}
            />
            <IconComponent
                icon={FaPen}
                onclick={props.clickTeaxtAreaOnly}
                bgColor={props.viewMode === MEMO_VIEW_MODE.textareaOnly ? 'blue' : ''}
            />
            <SpaceComponent
                space={'2%'}
            />
            <IconComponent
                icon={FaRegWindowMaximize}
                onclick={props.clickMultiView}
                bgColor={props.viewMode === MEMO_VIEW_MODE.multiView ? 'blue' : ''}
            />
            <SpaceComponent
                space={'2%'}
            />
            <IconComponent
                icon={FaEye}
                onclick={props.clickMarkdownOnly}
                bgColor={props.viewMode === MEMO_VIEW_MODE.markdownOnly ? 'blue' : ''}
            />
        </MemoHeadMenuDiv>
    );
}

export default MemoHeadMenu;