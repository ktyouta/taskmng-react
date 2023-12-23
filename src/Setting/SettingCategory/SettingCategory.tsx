import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import { useAtomValue } from 'jotai';
import HorizonLabelItemComponent from '../../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../../Common/BaseInputComponent';
import styled from 'styled-components';
import SettingCategoryMain from './SettingCategoryEditMain';
import SettingCategoryFooter from './SettingCategoryEditFooter';
import SettingCategoryEdit from './SettingCategoryEdit';
//import { masterDataListAtom } from '../Main/Hook/useMainLogic';
import { Routes, Route, Navigate } from "react-router-dom";
import SettingCategoryTop from './SettingCategoryTop';
import useSettingCategory from './Hook/useSettingCategory';


//外側のスタイル
const OuterDiv = styled.div`
    width: 100%;
    height: 100%;
    min-height: 100%;
`;

//編集モードの種類
export const editModeEnum = {
    noselect: 0,
    create: 1,
    update: 2,
}

//引数の型
type propsType = {
    path: string,
}


function SettingCategory(props: propsType) {

    console.log("SettingCategory render");

    return (
        <OuterDiv>
            <Routes>
                <Route
                    path="/"
                    element={
                        <SettingCategoryTop
                            path={props.path}
                        />}
                />
                <Route
                    path="edit"
                    element={<SettingCategoryEdit
                        path={props.path}
                    />}
                />
            </Routes>
        </OuterDiv>
    );
}

export default SettingCategory;