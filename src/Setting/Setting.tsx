import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { useAtomValue } from 'jotai';
import SettingMenu from './SettingMenu';
import SettingMain from './SettingMain';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


function Setting() {

  console.log("setting render");

  return (
    <div className="setting">
      <SettingMenu
        width='15%'
      />
      <SettingMain
        width='85%'
      />
    </div>
  );
}

export default Setting;