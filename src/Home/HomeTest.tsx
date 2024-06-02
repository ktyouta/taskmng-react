import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import HomeWorkHistory from './HomeWorkHistory';
import { BoldSpan, HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';
import HomeHistory from './HomeHistory';


//ホーム画面のスタイル
const HomeDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
    background-color: #f5f5f5;
`;

//履歴表示エリアのスタイル
const MainDiv = styled.div<{ height: string | undefined }>`
    padding-top: 1%;
    height:${({ height }) => (height)};
    width: 100%;
    box-sizing: border-box;
    padding-left: 6%;
`;


function HomeTest() {

    console.log("HomeTest render");

    return (
        <HomeDiv
            height='100%'
        >
            <MainDiv
                height='97%'
            >
                <HomeHistory />
            </MainDiv>
        </HomeDiv>
    );
}

export default HomeTest;