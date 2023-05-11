import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtomValue } from 'jotai';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';
import ENV from '../env.json';
import useTask from './Hook/useTask';


//汎用詳細取得URL(優先度)
export const PRIORITY_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}/2`;
//汎用詳細取得URL(ステータス)
export const STATUS_URL = `${ENV.PROTOCOL}${ENV.DOMAIN}${ENV.PORT}${ENV.GENERALDETAIL}/3`;


function Task() {

  console.log("Task render");

  useTask();

  return (
    <div className="task">
      <TaskTop />
      <TaskFooter />
    </div>
  );
}

export default Task;