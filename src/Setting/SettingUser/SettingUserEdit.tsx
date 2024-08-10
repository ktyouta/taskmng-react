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
import WaitLoading from '../../Common/WaitLoading';
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
    registerTime,
    updTime,
    orgIconUrl,
    isLoadinGetuser,
    authList,
    positiveButtonObj,
    deleteButtonObj,
    runButtonObj,
    editMode,
    isEditable,
    isUpdLoading,
    userDatas,
    userDatasDisptch,
  } = useSettingUserEdit({ ...props });

  return (
    <OuterDiv>
      <SettingUserEditMain
        outerHeight={'85%'}
        authList={authList}
        registerTime={registerTime}
        updTime={updTime}
        orgIconUrl={orgIconUrl}
        editMode={editMode}
        isEditable={isEditable}
        userDatas={userDatas}
        userDatasDisptch={userDatasDisptch}
      />
      <SettingUserEditFooter
        positiveButtonObj={positiveButtonObj}
        deleteButtonObj={deleteButtonObj}
        runButtonObj={runButtonObj}
        outerHeight={'15%'}
        isEditable={isEditable}
      />
      {/* ユーザー情報取得時ローディング */}
      {
        isLoadinGetuser &&
        <CenterLoading />
      }
      {/* ユーザー情報更新時ローディング */}
      {
        isUpdLoading &&
        <WaitLoading
          top='9%'
          left='15%'
        />
      }
    </OuterDiv>

  );
}

export default SettingUserEdit;