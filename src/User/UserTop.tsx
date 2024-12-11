import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import UserFooter from './UserFooter';
import styled from 'styled-components';
import useSettingUserEdit from '../Setting/SettingUser/Hook/useSettingUserEdit';
import SettingUserEditMain from '../Setting/SettingUser/SettingUserEditMain';
import CenterLoading from '../Common/CenterLoading';
import useUserTop from './Hook/useUserTop';
import WaitLoading from '../Common/WaitLoading';
import { authType } from '../Common/Hook/useCheckAuth';
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

function UserTop(props: propsType) {

    console.log("UserTop render");

    const {
        registerTime,
        updTime,
        orgIconUrl,
        isLoadinGetuser,
        positiveButtonObj,
        runButtonObj,
        editMode,
        isEditable,
        isUpdLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
    } = useUserTop({ ...props });

    return (
        <OuterDiv>
            <SettingUserEditMain
                outerHeight={'85%'}
                registerTime={registerTime}
                updTime={updTime}
                orgIconUrl={orgIconUrl}
                editMode={editMode}
                isEditable={isEditable}
                userDatas={userDatas}
                userDatasDisptch={userDatasDisptch}
                inputUserAuthList={inputUserAuthList}
                setInputUserAuthList={setInputUserAuthList}
                orgAuthList={orgAuthList}
            />
            <UserFooter
                positiveButtonObj={positiveButtonObj}
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

export default UserTop;