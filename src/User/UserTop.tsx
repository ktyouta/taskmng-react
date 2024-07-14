import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import UserFooter from './UserFooter';
import styled from 'styled-components';
import useSettingUserEdit from '../Setting/SettingUser/Hook/useSettingUserEdit';
import SettingUserEditMain from '../Setting/SettingUser/SettingUserEditMain';
import CenterLoading from '../Common/CenterLoading';
import useUserTop from './Hook/useUserTop';
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
        runButtonObj,
        editMode,
        iconUrl,
        setIconUrl,
        iconType,
        setIconType,
        isEditable,
    } = useUserTop({ ...props });

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
                editMode={editMode}
                iconUrl={iconUrl}
                setIconUrl={setIconUrl}
                iconType={iconType}
                setIconType={setIconType}
                isEditable={isEditable}
            />
            <UserFooter
                positiveButtonObj={positiveButtonObj}
                runButtonObj={runButtonObj}
                outerHeight={'15%'}
                isEditable={isEditable}
            />
            {
                isLoadinGetuser && <CenterLoading />
            }
        </OuterDiv>

    );
}

export default UserTop;