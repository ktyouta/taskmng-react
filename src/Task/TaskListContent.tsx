import React, { useState } from 'react';
import '../App.css';
import useTaskListContent from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import TaskList from './TaskList';
import ModalComponent from '../Common/ModalComponent';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import './css/TaskListContent.css';
import TaskEdit from './TaskEdit';
import LabelComponent from '../Common/LabelComponent';
import TaskDetail from './TaskDetail';
import { HeightDiv, WidthDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


//エラーメッセージエリア
const ErrAreaDiv = styled.div`
    padding: 0 1 %;
`;

//表示件数
const DispLabel = styled(WidthDiv)`
    text-align: right;
`;

function TaskListContent() {

    console.log("TaskListContent render");

    const {
        isModalOpen,
        offFlag,
        displayTaskList,
        errMessage,
        updTaskId,
    } = useTaskListContent();

    //該当データが存在しない
    if (errMessage) {
        return (
            <ErrAreaDiv>
                <MessageComponent
                    message={errMessage}
                    styleTypeNumber={labelType.danger}
                />
            </ErrAreaDiv>
        );
    }

    return (
        <HeightDiv
            height='78%'
        >
            <DispLabel
                width='93%'
            >
                <LabelComponent
                    title={`表示件数：${displayTaskList.length}件`}
                />
            </DispLabel>
            <TaskList
                displayTaskList={displayTaskList}
            />
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <TaskDetail
                    updTaskId={updTaskId}
                    closeFn={offFlag}
                    backBtnTitle="閉じる"
                />
            </ModalComponent>
        </HeightDiv>
    );
}

export default TaskListContent;