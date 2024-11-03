import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import './css/Setting.css';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';
import useSettingMain from './Hook/useSettingMain';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingCustom from './SettingCustom/SettingCustom';
import { menuListType } from '../Common/Type/CommonType';


//外側のスタイル
const OuterDiv = styled.div<{ width: string }>`
    width: ${({ width }) => (width)};
    height: 100%;
    min-height: 100%;
`;

type propsType = {
  width: string,
  path: string,
  subMenuList: menuListType[],
}

function SettingMain(props: propsType) {

  console.log("SettingMain render");

  const { settingRouteList } = useSettingMain({ ...props });

  return (
    <OuterDiv
      width={props.width}
    >
      <Routes>
        {
          settingRouteList &&
          settingRouteList.map((element) => {
            return element;
          })
        }
      </Routes>
    </OuterDiv>
  );
}

export default SettingMain;