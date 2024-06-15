import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import HomeWorkHistory from './HomeWorkHistory';
import { BoldSpan, HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';
import VerticalSpaceComponent from '../Common/VerticalSpaceComponent';


//履歴表示エリアのスタイル
const MainDiv = styled.div`
    padding-top: 2%;
    height: 90%;
    width: 100%;
`;

//履歴表示エリアのスタイル
const TitleDiv = styled.div`
    text-align: left;
    margin-left: 5%;
    padding-top: 3%;
`;

function HomeTest() {

    console.log("Home render");

    return (
        <HeightDiv
            height='93%'
        >
            <TitleDiv>
                <LabelComponent
                    title={<BoldSpan>作業履歴</BoldSpan>}
                />
            </TitleDiv>
            <MainDiv>
                <VerticalSpaceComponent
                    space={'1%'}
                />
                <HomeWorkHistory />
            </MainDiv>
        </HeightDiv>
    );
}

export default HomeTest;