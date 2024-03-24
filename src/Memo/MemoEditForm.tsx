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
import ReactMarkdown from 'react-markdown';
import MarkDownArea from '../Common/MarkDownArea';
import SpaceComponent from '../Common/SpaceComponent';


//引数の型
type propsType = {
    memoTitle: string,
    setMemoTitle: React.Dispatch<React.SetStateAction<string>>,
    memoContent: string,
    setMemoContent: React.Dispatch<React.SetStateAction<string>>,
}

//入力欄
const MainAreaDiv = styled.div`
    padding-left: 5%;
    padding-top: 2%;
    height:100%;
    text-align:left;
`;

//タイトル
const TitleAreaDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//テキストエリアのスタイル
const MemoTextAreaDiv = styled(VerticalFlowDiv)`
  display:flex;
  width: 90%;
`;


function MemoEditForm(props: propsType) {

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
                    value={props.memoTitle}
                    onChange={props.setMemoTitle}
                />
            </TitleAreaDiv>
            <MemoTextAreaDiv
                height='84%'
            >
                <BaseTextAreaComponent
                    textWidth='90%'
                    height='96%'
                    value={props.memoContent}
                    onChange={props.setMemoContent}
                    isNotResize={true}
                />
                <SpaceComponent
                    space={'2%'}
                />
                <MarkDownArea
                    content={props.memoContent}
                    height={'97%'}
                    width={'90%'} />
            </MemoTextAreaDiv>
        </MainAreaDiv>
    );
}

export default MemoEditForm;