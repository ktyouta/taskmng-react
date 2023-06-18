import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtomValue } from 'jotai';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import ENV from '../env.json';
import TaskMain from './TaskMain';
import useTask from './Hook/useTask';
import TaskDetail from './TaskDetail';


function Task() {

  console.log("Task render");

  const {
    taskList,
    errMessage,
  } = useTask();

  return (
    <div className="task">
      <Routes>
        <Route path="/" element={<TaskMain />} />
        {
          taskList && taskList.length > 0 && taskList.map((element) => {
            return (
              <Route path={element.id} key={element.id} element={<TaskDetail updTaskId={element.id} />} />
            )
          })
        }
      </Routes>
    </div>
  );
}

export default Task;