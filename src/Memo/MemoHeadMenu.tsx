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
import useMemoHeadMenu from './Hook/useMemoHeadMenu';


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

//アイコンのスタイル
const IconDiv = styled.div`
    position:relative;
`;

//ナビゲーション
const NavDiv = styled.div<{ isDisplay: boolean }>`
    padding-left: 6px;
    position: absolute;
    top: 20px;
    font-size: 13px;
    height: auto;
    min-height: 24px;
    background-color: white;
    padding-top: 5px;
    border: 1px solid #a9a9a9;
    display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
    z-index: 10;
`;

//markdownラベル
const MdNavDiv = styled(NavDiv)`
    width: 125px;
    padding-left: 6px;
    position: absolute;
    left: -48px;
`
//両方表示用ラベル
const MlNavDiv = styled(NavDiv)`
    width: 72px;
    padding-left: 6px;
    position: absolute;
    left: -31px;
`

//エディタラベル
const TxNavDiv = styled(NavDiv)`
    width: 112px;
    padding-left: 6px;
    position: absolute;
    left: -48px;
`

function MemoHeadMenu(props: propsType) {

    console.log("MemoHeadMenu render");

    const {
        diplayMode,
        hoverIcon,
        isOnMarkdown,
        isOnMultiView,
        isOnTextArea,
    } = useMemoHeadMenu({ ...props });

    return (
        <MemoHeadMenuDiv
            height={props.height}
            width={props.width}
        >
            <SpaceComponent
                space='1%'
            />
            {
                isOnMarkdown ? "プレビュー" : "本文"
            }
            <SpaceComponent
                space={isOnMarkdown ? '82%' : '87%'}
            />
            <IconDiv
                onMouseEnter={() => { hoverIcon(MEMO_VIEW_MODE.textareaOnly) }}
                onMouseLeave={() => { hoverIcon("") }}
            >
                <IconComponent
                    icon={FaPen}
                    onclick={props.clickTeaxtAreaOnly}
                    bgColor={isOnTextArea ? 'blue' : ''}
                />
                <TxNavDiv
                    isDisplay={diplayMode === MEMO_VIEW_MODE.textareaOnly}
                >
                    エディタのみ表示
                </TxNavDiv>
            </IconDiv>
            <SpaceComponent
                space={'2%'}
            />
            <IconDiv
                onMouseEnter={() => { hoverIcon(MEMO_VIEW_MODE.multiView) }}
                onMouseLeave={() => { hoverIcon("") }}
            >
                <IconComponent
                    icon={FaRegWindowMaximize}
                    onclick={props.clickMultiView}
                    bgColor={isOnMultiView ? 'blue' : ''}
                />
                <MlNavDiv
                    isDisplay={diplayMode === MEMO_VIEW_MODE.multiView}
                >
                    両方を表示
                </MlNavDiv>
            </IconDiv>
            <SpaceComponent
                space={'2%'}
            />
            <IconDiv
                onMouseEnter={() => { hoverIcon(MEMO_VIEW_MODE.markdownOnly) }}
                onMouseLeave={() => { hoverIcon("") }}
            >
                <IconComponent
                    icon={FaEye}
                    onclick={props.clickMarkdownOnly}
                    bgColor={isOnMarkdown ? 'blue' : ''}
                />
                <MdNavDiv
                    isDisplay={diplayMode === MEMO_VIEW_MODE.markdownOnly}
                >
                    プレビューのみ表示
                </MdNavDiv>
            </IconDiv>
        </MemoHeadMenuDiv>
    );
}

export default MemoHeadMenu;