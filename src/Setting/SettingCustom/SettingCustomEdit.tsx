import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingCustomEditMain from './SettingCustomEditMain';
import SettingCustomEditFooter from './SettingCustomEditFooter';
import useSettingCustomEdit from './Hook/useSettingCustomEdit';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


function SettingCustomEdit() {

  console.log("SettingCustom render");

  useSettingCustomEdit();

  return (
    <OuterDiv>
      <SettingCustomEditMain
        outerHeight={'85%'}
      />
      <SettingCustomEditFooter
        positiveButtonObj={{
          title: '',
          type: 'BASE',
          onclick: undefined
        }}
        outerHeight={'15%'}
      />
    </OuterDiv>
  );
}

export default SettingCustomEdit;