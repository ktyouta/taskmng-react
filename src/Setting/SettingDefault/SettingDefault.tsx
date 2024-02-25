import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingDefaultMain from './SettingDefaultEditMain';
import SettingDefaultFooter from './SettingDefaultEditFooter';
import SettingDefaultEdit from './SettingDefaultEdit';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingDefaultTop from './SettingDefaultTop';
import useSettingDefault from './Hook/useSettingDefault';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


//引数の型
type propsType = {
  path: string,
}

function SettingDefault(props: propsType) {

  console.log("SettingDefault render");

  const {
    editMode,
  } = useSettingDefault();

  return (
    <OuterDiv>
      <Routes>
        <Route
          path="/"
          element={
            <SettingDefaultTop
              path={props.path}
            />
          }
        />
        <Route
          path="edit"
          element={
            <SettingDefaultEdit
              path={props.path}
            />
          }
        />
      </Routes>
    </OuterDiv>
  );
}

export default SettingDefault;