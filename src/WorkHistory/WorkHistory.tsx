import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import { masterDataListContext } from '../Main/Main';
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

  //WorkHistoryのビジネスロジック
  const { workDisplayList, isLoading, isError } = useWorkHistory();

  return (
    <div className="workhistory">
      <div className="workhistory-main-area">
        <LabelComponent
          title={"作業履歴"}
        />
        <LoadingWorkHistoryList
          workDisplayList={workDisplayList}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
}

export default WorkHistory;