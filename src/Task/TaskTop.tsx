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


function TaskTop() {

  console.log("TaskTop render");

  return (
    <div className="tasktop">
      <TaskSearch />
      <TaskListContent />
    </div>
  );
}

export default TaskTop;