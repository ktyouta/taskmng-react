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

//編集モードの種類
export const editModeEnum = {
  noselect: 0,
  create: 1,
  update: 2,
}

//引数の型
type propsType = {
  url: string,
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
              url={props.url}
            />
          }
        />
        <Route
          path="edit"
          element={
            <SettingCustomEdit
              url={props.url}
            />
          }
        />
      </Routes>
    </OuterDiv>
  );
}

export default SettingCustom;