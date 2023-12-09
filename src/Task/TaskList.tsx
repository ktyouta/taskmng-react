import React, { useState } from 'react';
import '../App.css';
import TaskContent from './TaskContent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/TaskList.css';
import { VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import useTaskList from './Hook/useTaskList';
import styled from 'styled-components';


const TaskListUl = styled.ul`
    padding-left: 0;
    height: 100%;
`;


//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[]
}


function TaskList(props: propsType) {

    console.log("TaskList render");

    let {
        taskContentList
    } = useTaskList({ ...props });

    return (
        <VerticalFlowDiv
            height='100%'
        >
            <TaskListUl>
                {taskContentList}
            </TaskListUl>
        </VerticalFlowDiv>
    );
}

export default TaskList;