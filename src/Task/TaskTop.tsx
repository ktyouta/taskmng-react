import React, { useState } from 'react';
import '../App.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ButtonComponent from '../Common/ButtonComponent';
import MessageComponent from '../Common/MessageComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import TableComponent from '../Common/TableComponent';
import TaskSearch from './TaskSearch';
import TaskList from './TaskList';
import TaskListContent from './TaskListContent';
import './css/TaskTop.css';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import { taskSearchConditionType } from './Type/TaskType';

//引数の型
type propsType = {
  path: string,
  taskSearchConditionList: taskSearchConditionType[] | undefined
}


function TaskTop(props: propsType) {

  console.log("TaskTop render");

  return (
    <HeightDiv
      height='85%'
    >
      <TaskSearch
        taskSearchConditionList={props.taskSearchConditionList}
      />
      <TaskListContent
        path={props.path}
      />
    </HeightDiv>
  );
}

export default TaskTop;