import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { masterDataListContext } from '../Main/Main';


function Setting() {

  console.log("top render");

  //全マスタのリスト(マスタメンテ画面のコンボ用)
  const { masterDataList } = useContext(masterDataListContext);

  return (
    <div className="setting">
      <h3>設定</h3>
    </div>
  );
}

export default Setting;