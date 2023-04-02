import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import useWorkHistory from './Hook/useWorkHistory';
import './css/WorkHistory.css';
import LabelComponent from '../Common/LabelComponent';
import LoadingWorkHistoryList from './LoadingWorkHistoryList';

export type workHistoryType = {
  time: string,
  userName: string,
  editMaster: string,
  editData: string,
  editType: string
}

function WorkHistory() {

  console.log("WorkHistory render");

  return (
    <div className="workhistory">
      <div className="workhistory-main-area">
        <LabelComponent
          title={"作業履歴"}
        />
        <LoadingWorkHistoryList/>
      </div>
    </div>
  );
}

export default WorkHistory;