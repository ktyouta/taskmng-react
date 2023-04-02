import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import MasterTableComponent from '../Master/MasterTableComponent';
import TopTableComponent from './TopTableComponent';
import './css/Top.css';
import WorkHistory from '../WorkHistory/WorkHistory';
import { useAtomValue } from 'jotai';
import { masterDataListAtom } from '../Main/Hook/useMainLogic';


function Top() {

  console.log("top render");

  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const masterDataList = useAtomValue(masterDataListAtom);

  return (
    <div className="top">
      <div className="top-title">マスタ一覧</div>
      <TopTableComponent
        masterDataList={masterDataList}
      />
      <WorkHistory/>
    </div>
  );
}

export default Top;