import React, { useContext, useEffect } from 'react';
import logo from './logo.svg';
import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import HomeWorkHistory from './HistroyList';
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

type propsType = {
    testId: string,
}

function Histroy(props: propsType) {

    console.log("Histroy render");

    return (
        <HeightDiv
            height='93%'
            data-testid={props.testId}
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

export default Histroy;