import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { useAtomValue } from 'jotai';
import SettingMenu from './SettingMenu';
import SettingMain from './SettingMain';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//引数の型
type propsType = {
  path: string,
  testId: string,
}

function Setting(props: propsType) {

  console.log("setting render");

  return (
    <div
      className="setting"
      data-testid={props.testId}
    >
      <SettingMenu
        width='15%'
        path={props.path}
      />
      <SettingMain
        width='85%'
        path={props.path}
      />
    </div>
  );
}

export default Setting;