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
import NotFoundComponent from '../NotFound/NotFoundComponent';


function Task() {

  console.log("Task render");

  const {
    detailRoutingId,
  } = useTask();

  return (
    <div className="task">
      <Routes>
        <Route path="/" element={<TaskMain />} />
        {/* 詳細のルーティング */}
        {
          detailRoutingId && <Route path={detailRoutingId} element={<TaskDetail updTaskId={detailRoutingId} />} />
        }
        <Route key={"*"} path="*" element={<NotFoundComponent backUrl='/task' />} />
      </Routes>
    </div>
  );
}

export default Task;