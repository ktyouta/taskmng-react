import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import DynamicForm from '../Common/DynamicForm';
import { refInfoType } from '../Common/Type/CommonType';
import styled from 'styled-components';
import { editDisplayMemoType } from './Type/MemoType';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import BaseInputComponent from '../Common/BaseInputComponent';
import LabelTextAreaComponent from '../Common/LabelTextAreaComponent';
import BaseTextAreaComponent from '../Common/BaseTextAreaComponent';
import { VerticalFlowDiv } from '../Common/StyledComponent/CommonStyledComponent';


//入力欄
const MainAreaDiv = styled.div`
    padding-left: 1%;
    padding-top: 2%;
    height:100%;
`;

//タイトル
const TitleAreaDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;


function MemoEditForm() {

    console.log("MemoEditForm render");

    return (
        <MainAreaDiv>
            {/* 入力欄 */}
            <TitleAreaDiv
                height="10%"
            >
                <BaseInputComponent
                    placeholder='タイトル'
                    textWidth='90%'
                />
            </TitleAreaDiv>
            <VerticalFlowDiv
                height='70%'
            >
                <BaseTextAreaComponent
                    textWidth='90%'
                    height='80%'
                />
            </VerticalFlowDiv>
        </MainAreaDiv>
    );
}

export default MemoEditForm;