import '../App.css';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import React from 'react';
import { taskSearchConditionType } from './Type/TaskType';

//引数の型
type propsType = {
    path: string,
    taskSearchConditionList: taskSearchConditionType[] | undefined
}

function TaskMain(props: propsType) {

    console.log("TaskMain render");

    return (
        <React.Fragment>
            <TaskTop
                path={props.path}
                taskSearchConditionList={props.taskSearchConditionList}
            />
            <TaskFooter />
        </React.Fragment>
    );
}

export default TaskMain;