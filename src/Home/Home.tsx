import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import HomeWorkHistory from './HomeWorkHistory';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


//履歴表示エリアのスタイル
const MainDiv = styled.div`
    text-align: left;
    margin-left: 5%;
    padding-top: 3%;
`;

function Home() {

    console.log("Home render");

    return (
        <HeightDiv
            height='100%'
        >
            <MainDiv>
                <LabelComponent
                    title={"作業履歴"}
                />
                <HomeWorkHistory />
            </MainDiv>
        </HeightDiv>
    );
}

export default Home;