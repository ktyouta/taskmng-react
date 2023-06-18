import '../App.css';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import React from 'react';


function TaskMain() {

    console.log("TaskMain render");

    return (
        <React.Fragment>
            <TaskTop />
            <TaskFooter />
        </React.Fragment>
    );
}

export default TaskMain;