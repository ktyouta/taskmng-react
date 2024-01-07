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
    id,
    setId,
    caNm,
    caDescription,
    caType,
    caRequired,
    isHidden,
    isNewCreateVisible,
    setCaNm,
    setCaDescription,
    setCaType,
    setCaRequired,
    setIsHidden,
    setIsNewCreateVisible,
    isLoadinGetDefaultAttribute,
    typeValue,
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
        id={id}
        setId={setId}
        outerHeight={'85%'}
        caNm={caNm}
        caDescription={caDescription}
        caType={caType}
        caRequired={caRequired}
        typeValue={typeValue}
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