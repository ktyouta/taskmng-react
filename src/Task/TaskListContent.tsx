import React, { useState } from 'react';
import '../App.css';
import useTaskListContent from './Hook/useTaskListContent';
import TaskContent from './TaskContent';
import TaskList from './TaskList';
import ModalComponent from '../Common/ModalComponent';


function TaskListContent() {

    console.log("TaskListContent render");

    const {
        isModalOpen,
        offFlag,
        displayTaskList
    } = useTaskListContent();

    return (
        <div className="tasklistcontent">
            {/* <div className="tasktablecomponent-message-area">
                <div style={{ width: "75%" }}>
                    {
                        isDisplayMessage && <MessageComponent message={"該当するデータがありません。"} styleTypeNumber={labelType.danger} />
                    }
                </div>
                <SpaceComponent space={"9%"} />
                <ResultNumComponent num={resultNum} />
            </div> */}
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