import '../App.css';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import React from 'react';

//引数の型
type propsType = {
    path: string,
}

function TaskMain(props: propsType) {

    console.log("TaskMain render");

    return (
        <React.Fragment>
            <TaskTop
                path={props.path}
            />
            <TaskFooter />
        </React.Fragment>
    );
}

export default TaskMain;