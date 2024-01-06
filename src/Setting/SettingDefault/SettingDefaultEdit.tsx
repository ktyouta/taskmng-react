import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingDefaultEditMain from './SettingDefaultEditMain';
import SettingDefaultEditFooter from './SettingDefaultEditFooter';
import useSettingDefaultEdit from './Hook/useSettingDefaultEdit';
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

function SettingDefaultEdit(props: propsType) {

  console.log("SettingDefaultEdit render");

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
    isLoadinGetDefaultAttribute,
    addSelectElement,
    deleteSelectElement,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
    registerTime,
    updTime,
    editMode
  } = useSettingDefaultEdit({ ...props });

  return (
    <OuterDiv>
      <SettingDefaultEditMain
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
      <SettingDefaultEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
      />
      {
        isLoadinGetDefaultAttribute &&
        <CenterLoading />
      }
    </OuterDiv>
  );
}

export default SettingDefaultEdit;