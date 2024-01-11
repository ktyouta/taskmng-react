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
    defaultId,
    type,
    caNm,
    caDescription,
    caType,
    caRequired,
    isHidden,
    isNewCreateVisible,
    length,
    isSettingEditable,
    setCaNm,
    setCaDescription,
    setCaType,
    setCaRequired,
    setIsHidden,
    setIsNewCreateVisible,
    setLength,
    isLoadinGetDefaultAttribute,
    typeValue,
    positiveButtonObj,
    runButtonObj,
    registerTime,
    updTime,
    editMode
  } = useSettingDefaultEdit({ ...props });

  return (
    <OuterDiv>
      <SettingDefaultEditMain
        outerHeight={'85%'}
        defaultId={defaultId}
        type={type}
        caNm={caNm}
        caDescription={caDescription}
        caType={caType}
        caRequired={caRequired}
        typeValue={typeValue}
        isSettingEditable={isSettingEditable}
        setCaNm={setCaNm}
        setCaDescription={setCaDescription}
        setCaType={setCaType}
        setCaRequired={setCaRequired}
        registerTime={registerTime}
        updTime={updTime}
        editMode={editMode}
        isHidden={isHidden}
        isNewCreateVisible={isNewCreateVisible}
        setIsHidden={setIsHidden}
        setIsNewCreateVisible={setIsNewCreateVisible}
        length={length}
        setLength={setLength}
      />
      <SettingDefaultEditFooter
        positiveButtonObj={positiveButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
        isSettingEditable={isSettingEditable}
      />
      {
        isLoadinGetDefaultAttribute &&
        <CenterLoading />
      }
    </OuterDiv>
  );
}

export default SettingDefaultEdit;