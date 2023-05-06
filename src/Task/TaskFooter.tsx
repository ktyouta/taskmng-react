import React, { useState } from 'react';
import '../App.css';
import VerticalLabellInputComponent from '../Common/VerticalLabellInputComponent';
import useTaskFooter from './Hook/useTaskFooter';
import ButtonComponent from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import './css/TaskFooter.css';


function TaskFooter() {

    console.log("TaskFooter render");

    const {
        taskContentRef,
        create,
        clearButtonFunc } = useTaskFooter();

    return (
        <div className="taskfooter">
            <VerticalLabellInputComponent
                title={"タスク内容"}
                value={""}
                lenght={100}
                editFlg={true}
                ref={taskContentRef}
                textWidth={"350px"}
                titleWidth={"100px"}
            />
            <SpaceComponent
                space={"34%"}
            />
            <ButtonComponent
                styleTypeNumber="BASE"
                title={"クリア"}
                onclick={clearButtonFunc}
            />
            <SpaceComponent
                space={"2%"}
            />
            <ButtonComponent
                styleTypeNumber="RUN"
                title={"登録"}
                onclick={create}
            />
        </div>
    );
}

export default TaskFooter;