import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import useSettingUserEdit from './Hook/useSettingUserEdit';
import SettingUserEditMain from '../SettingUser/SettingUserEditMain';
import SettingUserEditFooter from '../SettingUser/SettingUserEditFooter';
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
  path: string,
}

function SettingUserEdit(props: propsType) {

  console.log("SettingUserEdit render");

  const {
    userId,
    id,
    setId,
    userName,
    setUserName,
    password,
    setPassword,
    auth,
    setAuth,
    registerTime,
    updTime,
    isLoadinGetuser,
    authList,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
  } = useSettingUserEdit({ ...props });

  return (
    <OuterDiv>
      <SettingUserEditMain
        outerHeight={'85%'}
        userId={userId}
        id={id}
        setId={setId}
        userName={userName}
        setUserName={setUserName}
        password={password}
        setPassword={setPassword}
        authList={authList}
        auth={auth}
        setAuth={setAuth}
        registerTime={registerTime}
        updTime={updTime}
      />
      <SettingUserEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
      />
      {
        isLoadinGetuser && <CenterLoading />
      }
    </OuterDiv>

  );
}

export default SettingUserEdit;