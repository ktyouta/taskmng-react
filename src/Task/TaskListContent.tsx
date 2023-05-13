import React, { useState } from 'react';
import '../App.css';
import useTaskListContent from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import TaskList from './TaskList';
import ModalComponent from '../Common/ModalComponent';
import MessageComponent, { labelType } from '../Common/MessageComponent';
import './css/TaskListContent.css';
import TaskEdit from './TaskEdit';


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
            <div className='tasklistcontent-errarea'>
                <MessageComponent
                    message={errMessage}
                    styleTypeNumber={labelType.danger}
                />
            </div>
        );
    }

    return (
        <div className="tasklistcontent">
            <TaskList
                displayTaskList={displayTaskList}
            />
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <TaskEdit
                    updTaskId={updTaskId}
                    closeFn={offFlag}
                />
            </ModalComponent>
        </div>
    );
}

export default TaskListContent;