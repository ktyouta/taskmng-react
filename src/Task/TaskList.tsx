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


//タスクコンテンツ表示UL
const TaskListUl = styled.ul`
    padding-left:0;
    height: 93%;
`;

//検索結果0件の表示スタイル
const NoResultListDiv = styled.div`
    padding-left: 7%;
    padding-top: 2%;
    box-sizing:border-box;
`;


//引数の型
type propsType = {
    displayTaskList: taskContentDisplayType[] | null,
    isLoading: boolean,
    detailHoverId: string,
    checkDelTask: (taskId: string) => void,
    delTaskIdList: string[],
    checkRecTask: (taskId: string) => void,
    recTaskIdList: string[],
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

    if (!props.displayTaskList) {
        return <CenterLoading />;
    }

    //検索結果が0件
    if (props.displayTaskList.length === 0) {
        return (
            <NoResultListDiv>
                上記の検索条件に該当するタスクが存在しません。
            </NoResultListDiv>
        );
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