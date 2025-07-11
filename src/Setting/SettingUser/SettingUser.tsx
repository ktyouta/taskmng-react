import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingUserMain from './SettingUserEditMain';
import SettingUserFooter from './SettingUserEditFooter';
import SettingUserEdit from './SettingUserEdit';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingUserTop from './SettingUserTop';
import useSettingUser from './Hook/useSettingUser';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;


//引数の型
type propsType = {
    path: string,
    menuId: string,
}


function SettingUser(props: propsType) {

    console.log("SettingUser render");

    useSettingUser({ ...props });

    return (
        <OuterDiv>
            <Routes>
                <Route
                    path="/"
                    element={
                        <SettingUserTop
                            path={props.path}
                        />}
                />
                <Route
                    path="edit"
                    element={<SettingUserEdit
                        path={props.path}
                    />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default SettingUser;