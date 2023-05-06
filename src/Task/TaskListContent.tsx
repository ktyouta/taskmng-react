import React, { useState } from 'react';
import '../App.css';
import useTaskList from './Hook/useTaskList';
import TaskContent from './TaskContent';
import TaskList from './TaskList';
import ModalComponent from '../Common/ModalComponent';


function TaskListContent() {

    console.log("TaskList render");

    const {
        isModalOpen,
        offFlag,
        displayTaskList
    } = useTaskList();

    return (
        <div className="tasklistcontent">
            <TaskList
                displayTaskList={displayTaskList}
            />
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                タスク内容
            </ModalComponent>
        </div>
    );
}

export default TaskListContent;