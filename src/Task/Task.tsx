import React, { useState } from 'react';
import '../App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { selectedMasterDataType } from '../Common/Type/CommonType';
import { Provider, atom, useAtomValue } from 'jotai';
import TaskTop from './TaskTop';
import TaskFooter from './TaskFooter';
import './css/Task.css';


//取得したタスクリスト
export const taskLlistAtom = atom<{ [key: string]: string }[]>([]);


function Task() {

  console.log("Task render");

  return (
    <div className="task">
      <TaskTop />
      <TaskFooter />
    </div>
  );
}

export default Task;