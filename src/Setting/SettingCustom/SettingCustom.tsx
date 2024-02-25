import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingCustomMain from './SettingCustomEditMain';
import SettingCustomFooter from './SettingCustomEditFooter';
import SettingCustomEdit from './SettingCustomEdit';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingCustomTop from './SettingCustomTop';
import useSettingCustom from './Hook/useSettingCustom';


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

function SettingCustom(props: propsType) {

  console.log("SettingCustom render");

  const {
    editMode,
  } = useSettingCustom();

  return (
    <OuterDiv>
      <Routes>
        <Route
          path="/"
          element={
            <SettingCustomTop
              path={props.path}
            />
          }
        />
        <Route
          path="edit"
          element={
            <SettingCustomEdit
              path={props.path}
            />
          }
        />
      </Routes>
    </OuterDiv>
  );
}

export default SettingCustom;