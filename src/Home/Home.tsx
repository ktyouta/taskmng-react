import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
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
    padding-left: 3.5%;
`;

type propsType = {
    testId: string,
}

function Home(props: propsType) {

    console.log("Home render");

    return (
        <HomeDiv
            height='100%'
            data-testid={`${props.testId}`}
        >
            <MainDiv
                height='97%'
            >
                <HomeHistory
                    height="95%"
                    width="95%"
                />
            </MainDiv>
        </HomeDiv>
    );
}

export default Home;