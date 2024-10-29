import '../App.css';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import React from 'react';
import { taskSearchConditionType } from './Type/TaskType';
import useTaskMain from './Hook/useTaskMain';
import TaskSearch from './TaskSearch';
import TaskListContent from './TaskListContent';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';

//引数の型
type propsType = {
    path: string,
    taskSearchConditionList: taskSearchConditionType[] | undefined
}

function TaskMain(props: propsType) {

    console.log("TaskMain render");

    const {
        checkDelTask,
        deleteSelectedTasks,
        delTaskIdList,
        checkRecTask,
        recoverySelectedTasks,
        recTaskIdList
    } = useTaskMain();

    return (
        <React.Fragment>
            <HeightDiv
                height='85%'
            >
                <TaskSearch
                    taskSearchConditionList={props.taskSearchConditionList}
                />
                <TaskListContent
                    path={props.path}
                    checkDelTask={checkDelTask}
                    delTaskIdList={delTaskIdList}
                    checkRecTask={checkRecTask}
                    recTaskIdList={recTaskIdList}
                />
            </HeightDiv>
            <TaskFooter
                deleteSelectedTasks={deleteSelectedTasks}
                recoverySelectedTasks={recoverySelectedTasks}
            />
        </React.Fragment>
    );
}

export default TaskMain;