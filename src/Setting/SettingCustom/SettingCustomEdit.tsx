import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingCustomEditMain from './SettingCustomEditMain';
import SettingCustomEditFooter from './SettingCustomEditFooter';
import useSettingCustomEdit from './Hook/useSettingCustomEdit';
import CenterLoading from '../../Common/CenterLoading';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


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

function SettingCustomEdit(props: propsType) {

  console.log("SettingCustomEdit render");

  const {
    caNm,
    caDescription,
    caType,
    caRequired,
    caSelectList,
    selectElementList,
    setCaNm,
    setCaDescription,
    setCaType,
    setCaRequired,
    isLoadinGetCustomAttribute,
    addSelectElement,
    deleteSelectElement,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
    registerTime,
    updTime,
    editMode
  } = useSettingCustomEdit({ ...props });

  return (
    <OuterDiv>
      <SettingCustomEditMain
        outerHeight={'85%'}
        caNm={caNm}
        caDescription={caDescription}
        caType={caType}
        caRequired={caRequired}
        setCaNm={setCaNm}
        setCaDescription={setCaDescription}
        setCaType={setCaType}
        setCaRequired={setCaRequired}
        addSelectElement={addSelectElement}
        deleteSelectElement={deleteSelectElement}
        caSelectList={caSelectList}
        selectElementList={selectElementList}
        registerTime={registerTime}
        updTime={updTime}
        editMode={editMode}
      />
      <SettingCustomEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
      />
      {
        isLoadinGetCustomAttribute &&
        <CenterLoading />
      }
    </OuterDiv>
  );
}

export default SettingCustomEdit;