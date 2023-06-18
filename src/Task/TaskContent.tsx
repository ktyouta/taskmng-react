import styled from 'styled-components';
import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import React from 'react';


//外側のスタイル
const OuterDiv = styled.div<{ bdColor?: string }>`
    border: 1px solid;
    border-radius: 5px;
    min-height: 65px;
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
    background-color: ${({ titleBgColor }) => (titleBgColor ?? "#d3d3d3")};
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
    min-height: 30px;
    padding-left: 10px;
    background-color: ${({ infoBgColor }) => (infoBgColor ?? "#dcdcdc")};
`;

//ボタンエリアのスタイル
const ButtonAreaDiv = styled.div`
    margin: 0 0 0 auto;
`;


function TaskContent(props: taskContentDisplayType) {

    console.log("TaskContent render");

    return (
        <OuterDiv
            bdColor={props.bdColor}
        >
            {/* タイトル */}
            <ContentTitleDiv
                titleBgColor={props.titleBgColor}
                onClick={props.onClickTitle}
            >
                {props.title}
            </ContentTitleDiv>
            <ContentInfoDiv
                infoBgColor={props.infoBgColor}
            >
                {/* 内容 */}
                {
                    props.content && props.content.map((element) => {
                        return (
                            <React.Fragment key={`${element.label}-${element.value}-${props.id}`}>
                                <div>
                                    {`${element.label}：${element.value}`}
                                </div>
                                <SpaceComponent
                                    space='2%'
                                />
                            </React.Fragment>
                        )
                    })
                }
                {/* ボタン */}
                <ButtonAreaDiv>
                    {props.editButton}
                </ButtonAreaDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default TaskContent;