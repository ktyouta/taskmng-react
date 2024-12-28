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
import UserEditMain from './UserEditMain';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;



function UserTop() {

    console.log("UserTop render");

    const {
        orgIconUrl,
        isLoadinGetuser,
        positiveButtonObj,
        runButtonObj,
        editMode,
        isUpdLoading,
        userDatas,
        userDatasDisptch,
        inputUserAuthList,
        setInputUserAuthList,
        orgAuthList,
        userId,
    } = useUserTop();

    return (
        <OuterDiv>
            <UserEditMain
                outerHeight={'85%'}
                orgIconUrl={orgIconUrl}
                editMode={editMode}
                userDatas={userDatas}
                userDatasDisptch={userDatasDisptch}
                inputUserAuthList={inputUserAuthList}
                setInputUserAuthList={setInputUserAuthList}
                orgAuthList={orgAuthList}
                userId={userId}
            />
            <UserFooter
                positiveButtonObj={positiveButtonObj}
                runButtonObj={runButtonObj}
                outerHeight={'15%'}
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