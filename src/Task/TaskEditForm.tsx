import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import DynamicForm from '../Common/DynamicForm';
import { refInfoType } from '../Common/Type/CommonType';
import styled from 'styled-components';
import { editDisplayTaskType } from './Type/TaskType';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';


//引数の型
type propsType = {
    title: string,
    refInfoArray: refInfoType[],
    isUpDelLoading: boolean,
    errMessage: string,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//ヘッダー
const HeaderDiv = styled.div`
    height: 10%;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

//入力欄
const MainAreaDiv = styled.div`
    height: 85%;
    overflow-y: auto;
    margin-left: 15%;
`;

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;

//表示欄のスタイル
const ValueSpan = styled.span`
    width:80%
`;


function TaskEditForm(props: propsType) {

    console.log("TaskEditForm render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <HeaderDiv>
                <LabelComponent
                    title={props.title}
                />
            </HeaderDiv>
            <MainAreaDiv>
                {/* 入力欄 */}
                <DynamicForm
                    refInfoArray={props.refInfoArray}
                />
            </MainAreaDiv>
        </OuterDiv>
    );
}

export default TaskEditForm;