import styled from 'styled-components';
import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import React from 'react';
import useTaskContent from './Hook/useTaskContent';
import { DEFAULT_STATUS_BACKCOLOR, DEFAULT_STATUS_BODERCOLOR } from './Const/TaskConst';


//外側のスタイル
const OuterDiv = styled.div<{ bdColor?: string }>`
    outline: 2px solid;
    border-radius: 5px;
    min-height: 65px;
    height: auto;
    outline-color: ${({ bdColor }) => (bdColor ?? DEFAULT_STATUS_BODERCOLOR)};
    height: 100%;
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div<{ titleBgColor?: string }>`
    text-align: left;
    height: 40%;
    min-height: 30px;
    border-bottom: 1px solid;
    border-color: #888888;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    font-size: 20px;
    padding-left: 10px;
    background-color: ${({ titleBgColor }) => (titleBgColor ?? DEFAULT_STATUS_BACKCOLOR)};
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
    height: 60%;
    border-radius: 0px 0x 5px 5px;
    min-height: 30px;
    padding-left: 10px;
    background-color: ${({ infoBgColor }) => (infoBgColor ?? DEFAULT_STATUS_BACKCOLOR)};
`;

//ボタンエリアのスタイル
const ButtonAreaDiv = styled.div`
    margin: 0 0 0 auto;
    position:relative;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

//ナビゲーションのスタイル
const DetailNavDiv = styled.div<{ isDisplay: boolean }>`
    position: absolute;
    top: 39px;
    font-size: 13px;
    height: 79%;
    min-height: 24px;
    background-color: white;
    outline: 1px solid #b0c4de;
    display: ${({ isDisplay }) => (isDisplay ? "block" : "none")};
    z-index: 10;
    width: auto;
    position: absolute;
    left: -107px;
    box-sizing: border-box;
    padding: 15%;
    color: black;
    border-radius: 5px;
`;

//引数の型
type propsType = {
    contentObj: taskContentDisplayType,
    detailHoverId: string,
}


function TaskContent(props: propsType) {

    console.log("TaskContent render");

    const {
        contentList
    } = useTaskContent({ ...props });

    return (
        <OuterDiv
            bdColor={props.contentObj.bdColor}
        >
            {/* タイトル */}
            <ContentTitleDiv
                titleBgColor={props.contentObj.titleBgColor}
                onClick={props.contentObj.onClickTitle}
            >
                {`${props.contentObj.id}：${props.contentObj.title}`}
            </ContentTitleDiv>
            <ContentInfoDiv
                infoBgColor={props.contentObj.infoBgColor}
            >
                {/* 内容 */}
                {contentList}
                {/* モーダル表示ボタン */}
                <ButtonAreaDiv>
                    {props.contentObj.editButton}
                    <DetailNavDiv
                        isDisplay={props.detailHoverId === props.contentObj.id}
                    >
                        詳細をモーダルで表示
                    </DetailNavDiv>
                </ButtonAreaDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default TaskContent;