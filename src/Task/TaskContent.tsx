import styled from 'styled-components';
import '../App.css';
import SpaceComponent from '../Common/SpaceComponent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import React from 'react';
import useTaskContent from './Hook/useTaskContent';
import { DEFAULT_STATUS_BACKCOLOR, DEFAULT_STATUS_BODERCOLOR } from './Const/TaskConst';
import { FLG } from '../Common/Const/CommonConst';
import LabelCheckBoxComponent from '../Common/LabelCheckBoxComponent';
import { userInfoType } from '../Common/Type/CommonType';
import { checkTaskDeletable, checkTaskRecoverable } from './Function/TaskFunction';


//外側のスタイル
const OuterDiv = styled.div<{ bdColor?: string }>`
    outline: 2px solid;
    border-radius: 5px;
    min-height: 65px;
    height: auto;
    outline-color: ${({ bdColor }) => (bdColor ?? DEFAULT_STATUS_BODERCOLOR)};
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

//タイトルエリアのスタイル
const ContentTitleAreaDiv = styled.div<{ titleBgColor?: string }>`
    border-bottom: 1px solid;
    border-color: #888888;
    border-radius: 5px 5px 0px 0px;
    overflow-wrap: break-word;
    padding-left: 10px;
    background-color: ${({ titleBgColor }) => (titleBgColor ?? DEFAULT_STATUS_BACKCOLOR)};
    width:100%;
    box-sizing: border-box;
    display:flex;
    flex-grow: 1;
    align-items: center;
`;

//タイトルのスタイル
const ContentTitleDiv = styled.div`
    text-align: left;
    overflow-wrap: break-word;
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
    width:90%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//削除エリアのスタイル
const DeleteAreaDiv = styled.div<{ titleBgColor?: string }>`
    overflow-wrap: break-word;
    width:10%;
    box-sizing: border-box;
    font-size: 15px;
    display: flex;
    align-items: center;
    margin-left: auto;
    justify-content: flex-end;
`;

//コンテンツのスタイル
const ContentInfoDiv = styled.div<{ infoBgColor?: string }>`
    display: flex;
    align-items: center;
    border-radius: 0px 0x 5px 5px;
    padding-left: 10px;
    background-color: ${({ infoBgColor }) => (infoBgColor ?? DEFAULT_STATUS_BACKCOLOR)};
    overflow-wrap: break-word;
    flex-grow: 2;
`;

//ボタンエリアのスタイル
const ButtonAreaDiv = styled.div`
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

//ナビゲーションのスタイル
const DetailNavDiv = styled.div<{ isDisplay: boolean }>`
    position: absolute;
    top: 39px;
    font-size: 13px;
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

//ユーザー名のスタイル
const UserNameSpan = styled.span<{ titleBgColor?: string }>`
    cursor:pointer;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
`;

//コンテンツ詳細のスタイル
const ContentDetailDiv = styled.div`
    width:90%;
    overflow-wrap: break-word;
`;

//コンテンツの削除選択エリアのスタイル
const ContentOpeDiv = styled.div`
    width:10%;
    overflow-wrap: break-word;
    display: flex;
`;

//引数の型
type propsType = {
    contentObj: taskContentDisplayType,
    detailHoverId: string,
    checkDelTask: (taskId: string) => void,
    delTaskIdList: string[],
    userInfo: userInfoType | undefined,
    checkRecTask: (taskId: string) => void,
    recTaskIdList: string[],
}


function TaskContent(props: propsType) {

    console.log("TaskContent render");

    const {
        clickUserNm,
        getDelTaskCheck,
        getRecTaskCheck,
        taskAuthority,
    } = useTaskContent({ ...props });

    return (
        <OuterDiv
            bdColor={props.contentObj.bdColor}
        >
            {/* タイトル */}
            <ContentTitleAreaDiv
                titleBgColor={props.contentObj.titleBgColor}
            >
                <ContentTitleDiv
                    onClick={props.contentObj.onClickTitle}
                >
                    {`${props.contentObj.taskContent.id}：${props.contentObj.taskContent.title}`}
                </ContentTitleDiv>
                <DeleteAreaDiv>
                    {`${props.contentObj.taskContent.deleteFlg === FLG.ON ? "削除済み" : ""}`}
                    {/* モーダル表示ボタン */}
                    <ButtonAreaDiv>
                        {props.contentObj.editButton}
                        <DetailNavDiv
                            isDisplay={props.detailHoverId === props.contentObj.taskContent.id}
                        >
                            詳細をモーダルで表示
                        </DetailNavDiv>
                    </ButtonAreaDiv>
                </DeleteAreaDiv>
            </ContentTitleAreaDiv>
            <ContentInfoDiv
                infoBgColor={props.contentObj.infoBgColor}
            >
                {/* 内容 */}
                <ContentDetailDiv
                    key={`${props.contentObj.taskContent.id}`}
                >
                    {
                        props.contentObj.taskContent.registerTime &&
                        <React.Fragment>
                            {`登録日：${props.contentObj.taskContent.registerTime}`}
                            <SpaceComponent
                                space='2%'
                            />
                        </React.Fragment>
                    }
                    {
                        props.contentObj.taskContent.updTime &&
                        <React.Fragment>
                            {`更新日：${props.contentObj.taskContent.updTime}`}
                            <SpaceComponent
                                space='2%'
                            />
                        </React.Fragment>
                    }
                    {
                        props.contentObj.taskContent.statusLabel &&
                        <React.Fragment>
                            {`ステータス：${props.contentObj.taskContent.statusLabel}`}
                            <SpaceComponent
                                space='2%'
                            />
                        </React.Fragment>
                    }
                    {
                        props.contentObj.taskContent.priorityLabel &&
                        <React.Fragment>
                            {`優先度：${props.contentObj.taskContent.priorityLabel}`}
                            <SpaceComponent
                                space='2%'
                            />
                        </React.Fragment>
                    }
                    {
                        props.contentObj.taskContent.userName &&
                        <React.Fragment>
                            作成ユーザー：<UserNameSpan onClick={clickUserNm}>{`${props.contentObj.taskContent.userName}`}</UserNameSpan>
                            <SpaceComponent
                                space='2%'
                            />
                        </React.Fragment>
                    }
                </ContentDetailDiv>
                <ContentOpeDiv>
                    {
                        props.userInfo && (
                            props.contentObj.taskContent.deleteFlg === FLG.OFF
                                ?
                                // 削除選択
                                (
                                    checkTaskDeletable(props.userInfo.userId, taskAuthority, props.contentObj.taskContent.userId) &&
                                    <LabelCheckBoxComponent
                                        title={'削除'}
                                        value={props.contentObj.taskContent.id}
                                        htmlForId={props.contentObj.taskContent.id}
                                        initValue={getDelTaskCheck(props.contentObj.taskContent.id)}
                                        onChange={props.checkDelTask}
                                        outerStyle={{
                                            "margin-left": "auto",
                                            "box-sizing": "border-box",
                                            "padding-right": "8%",
                                        }}
                                    />
                                )
                                :
                                // 復元選択
                                (
                                    checkTaskRecoverable(props.userInfo) &&
                                    <LabelCheckBoxComponent
                                        title={'復元'}
                                        value={props.contentObj.taskContent.id}
                                        htmlForId={props.contentObj.taskContent.id}
                                        initValue={getRecTaskCheck(props.contentObj.taskContent.id)}
                                        onChange={props.checkRecTask}
                                        outerStyle={{
                                            "margin-left": "auto",
                                            "box-sizing": "border-box",
                                            "padding-right": "8%",
                                        }}
                                    />
                                )
                        )
                    }
                </ContentOpeDiv>
            </ContentInfoDiv>
        </OuterDiv>
    );
}

export default TaskContent;