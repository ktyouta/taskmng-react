import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingCustomTable from './Hook/useSettingCustomTable';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


function SettingCustomTable() {

  console.log("SettingCustomTop render");

  const { customAttributeList } = useSettingCustomTable();

  return (
    <OuterDiv>
      
    </OuterDiv>
  );
}

export default SettingCustomTable;