import styled from 'styled-components';
import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayMemoListType, memoContentDisplayType } from './Type/MemoType';
import React from 'react';
import useMemoContent from './Hook/useMemoContent';


//外側のスタイル
const OuterDiv = styled.div<{ bdColor?: string }>`
    border: 1px solid;
    border-radius: 5px;
    min-height: 80px;
    height: auto;
    border-color: ${({ bdColor }) => (bdColor ?? "#c0c0c0")};
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div<{ titleBgColor?: string }>`
    text-align: left;
    height: auto;
    min-height: 30px;
    border-bottom: 1px solid;
    border-color: #a9a9a9;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    font-size: 20px;
    padding-left: 10px;
    background-color: ${({ titleBgColor }) => (titleBgColor ?? "#cccccc")};
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

//コンテンツのスタイル
const ContentInfoDiv = styled.div<{ infoBgColor?: string }>`
    display: flex;
    align-items: center;
    height: auto;
    border-radius: 0px 0x 5px 5px;
    min-height: 50px;
    padding-left: 10px;
    background-color: ${({ infoBgColor }) => (infoBgColor ?? "#cccccc")};
`;

//ボタンエリアのスタイル
const ButtonAreaDiv = styled.div`
    margin: 0 0 0 auto;
`;

//引数の型
type propsType = {
    contentObj: memoContentDisplayType
}


function MemoContent(props: propsType) {

    console.log("MemoContent render");

    const {
        contentList
    } = useMemoContent({ ...props });

    return (
        <OuterDiv
            bdColor={props.contentObj.bdColor}
        >
            {/* タイトル */}
            <ContentTitleDiv
                titleBgColor={props.contentObj.titleBgColor}
                onClick={props.contentObj.onClickTitle}
            >
                {`タイトル：${props.contentObj.title}`}
            </ContentTitleDiv>
            <ContentInfoDiv
                infoBgColor={props.contentObj.infoBgColor}
            >
                {/* 内容 */}
                {contentList}
                {/* モーダル表示ボタン */}
                <ButtonAreaDiv>
                    {props.contentObj.editButton}
                </ButtonAreaDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default MemoContent;