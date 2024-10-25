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
import TaskDetailModal from './TaskDetailModal';


//エラーメッセージエリア
const ErrAreaDiv = styled.div`
    padding: 0 1 %;
`;

//表示件数
const DispLabel = styled(WidthDiv)`
    text-align: right;
`;

//外側のスタイル
const ContentListOuterDiv = styled(HeightDiv)`
    padding-right: 3%;
    box-sizing: border-box;
`;

//引数の型
type propsType = {
    path: string,
    checkDelTask: (taskId: string) => void
}

function TaskListContent(props: propsType) {

    console.log("TaskListContent render");

    const {
        isModalOpen,
        offFlag,
        displayTaskList,
        errMessage,
        updTaskId,
        isLoading,
        orgTaskList,
        detailHoverId,
    } = useTaskListContent({ ...props });

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
        <ContentListOuterDiv
            height='79%'
        >
            <DispLabel
                width='97%'
            >
                <LabelComponent
                    title={orgTaskList ? `検索結果：${orgTaskList.length}件` : ``}
                />
            </DispLabel>
            {/* タスク一覧 */}
            <TaskList
                displayTaskList={displayTaskList}
                isLoading={isLoading}
                detailHoverId={detailHoverId}
                checkDelTask={props.checkDelTask}
            />
            {/* タスク詳細表示用モーダル */}
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <TaskDetailModal
                    updTaskId={updTaskId}
                    closeFn={offFlag}
                    backBtnTitle="閉じる"
                />
            </ModalComponent>
        </ContentListOuterDiv>
    );
}

export default TaskListContent;