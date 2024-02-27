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
    text-align: left;
    margin-left: 5%;
    padding-top: 3%;
    height: 90%;
`;

function Home() {

    console.log("Home render");

    return (
        <HeightDiv
            height='95%'
        >
            <MainDiv>
                <LabelComponent
                    title={<BoldSpan>作業履歴</BoldSpan>}
                />
                <VerticalSpaceComponent
                    space={'5%'}
                />
                <HomeWorkHistory />
            </MainDiv>
        </HeightDiv>
    );
}

export default Home;