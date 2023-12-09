import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserEdit from './Hook/useSettingUserEdit';
import SettingUserEditMain from '../SettingUser/SettingUserEditMain';
import SettingUserEditFooter from '../SettingUser/SettingUserEditFooter';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


function SettingUserEdit() {

  console.log("SettingUserEdit render");

  const {
    userName,
    setUserName,
    password,
    setPassword,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
  } = useSettingUserEdit();

  return (
    <OuterDiv>
      <SettingUserEditMain
        outerHeight={'85%'}
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
      />
      <SettingUserEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
      />
    </OuterDiv>
  );
}

export default SettingUserEdit;