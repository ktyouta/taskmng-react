import React, { useState } from 'react';
import '../App.css';
import TaskContent from './TaskContent';
import { displayTaskListType, taskContentDisplayType } from './Type/TaskType';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import './css/TaskList.css';
import { VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';
import useTaskList from './Hook/useTaskList';
import styled from 'styled-components';
import Loading from '../Common/Loading';
import CenterLoading from '../Common/CenterLoading';


const TaskListUl = styled.ul`
    padding-left: 0;
    height: 100%;
`;


//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[],
    isLoading: boolean,
}


function TaskList(props: propsType) {

    console.log("TaskList render");

    const {
        taskContentList
    } = useTaskList({ ...props });


    //タスクリスト表示までのローディング
    if (props.isLoading) {
        return <CenterLoading />;
    }

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