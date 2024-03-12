import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SearchConditionTop from './SettingSearchConditionTop';


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


function SettingSearchCondition(props: propsType) {

    console.log("SettingSearchCondition render");

    return (
        <OuterDiv>
            <Routes>
                <Route
                    path="/"
                    element={<SearchConditionTop
                        path={props.path}
                    />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default SettingSearchCondition;