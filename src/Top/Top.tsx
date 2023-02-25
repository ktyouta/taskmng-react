import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import { masterDataListContext } from '../Main/Main';
import MasterTableComponent from '../Master/MasterTableComponent';
import TopTableComponent from './TopTableComponent';
import './css/Top.css';
import WorkHistory from '../WorkHistory/WorkHistory';


function Top() {

  console.log("top render");

  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const { masterDataList } = useContext(masterDataListContext);

  return (
    <div className="top">
      <div className="top-title">マスタ一覧</div>
      <TopTableComponent
        selectedMasterBody={masterDataList}
      />
      <WorkHistory/>
    </div>
  );
}

export default Top;