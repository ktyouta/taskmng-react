import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SearchConditionTop from './SettingSearchConditionTop';
import useSettingSearchCondition from './Hook/useSettingSearchCondition';


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


function SettingSearchCondition(props: propsType) {

    console.log("SettingSearchCondition render");

    useSettingSearchCondition({ ...props });

    return (
        <OuterDiv>
            <Routes>
                <Route
                    path="/"
                    element={<SearchConditionTop />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default SettingSearchCondition;