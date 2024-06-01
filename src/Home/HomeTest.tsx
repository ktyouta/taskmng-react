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
const MainDiv = styled.div`
    padding-top: 2%;
    height: 90%;
    width: 100%;
    box-sizing: border-box;
    padding-left: 6%;
`;

//履歴表示エリアのスタイル
const TitleDiv = styled.div`
    text-align: left;
    margin-left: 5%;
    padding-top: 3%;
`;

//タイトルのスタイル
const TitleBoldSpan = styled(BoldSpan)`
    font-size: 1.1rem;
`;


function HomeTest() {

    console.log("HomeTest render");

    return (
        <HomeDiv
            height='93%'
        >
            <TitleDiv>
                <LabelComponent
                    title={<TitleBoldSpan>プロジェクトホーム</TitleBoldSpan>}
                />
            </TitleDiv>
            <MainDiv>
                <VerticalSpaceComponent
                    space={'1%'}
                />
                <HomeHistory />
            </MainDiv>
        </HomeDiv>
    );
}

export default HomeTest;