import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { useAtomValue } from 'jotai';
import SettingMenu from './SettingMenu';
import SettingMain from './SettingMain';
import { menuListType } from '../Common/Type/CommonType';


//引数の型
type propsType = {
  path: string,
  testId: string,
  subMenuList: menuListType[],
}

function Setting(props: propsType) {

  console.log("setting render");

  return (
    <div
      className="setting"
      data-testid={props.testId}
    >
      <SettingMain
        width='100%'
        path={props.path}
        subMenuList={props.subMenuList}
      />
    </div>
  );
}

export default Setting;