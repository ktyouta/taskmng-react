import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingCategoryEdit from './Hook/useSettingCategoryEdit';
import SettingCategoryEditMain from '../SettingCategory/SettingCategoryEditMain';
import SettingCategoryEditFooter from '../SettingCategory/SettingCategoryEditFooter';
import Loading from '../../Common/Loading';
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
  url: string,
}

function SettingCategoryEdit(props: propsType) {

  console.log("SettingCategoryEdit render");

  const {
    categoryId,
    id,
    setId,
    categoryName,
    setCategoryName,
    password,
    setPassword,
    auth,
    setAuth,
    registerTime,
    updTime,
    isLoadinGetcategory,
    authList,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
  } = useSettingCategoryEdit({ ...props });

  return (
    <OuterDiv>
      <SettingCategoryEditMain
        outerHeight={'85%'}
        categoryId={categoryId}
        id={id}
        setId={setId}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        password={password}
        setPassword={setPassword}
        authList={authList}
        auth={auth}
        setAuth={setAuth}
        registerTime={registerTime}
        updTime={updTime}
      />
      <SettingCategoryEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
      />
      {
        isLoadinGetcategory && <CenterLoading />
      }
    </OuterDiv>

  );
}

export default SettingCategoryEdit;