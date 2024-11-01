import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import { refInfoType } from '../Common/Type/CommonType';
import styled from 'styled-components';
import { editDisplayTaskType } from './Type/TaskType';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import DynamicFormComponent from '../Common/DynamicFormComponent';


//引数の型
type propsType = {
    refInfoArray: refInfoType[] | undefined,
    outerHeight: string,
}

//外側のスタイル
const OuterDiv = styled.div<{ height: string | undefined }>`
    height:${({ height }) => (height)};
`;

//入力欄
const MainAreaDiv = styled.div`
    box-sizing: border-box;
    padding-left: 15%;
    padding-top: 2%;
`;

function TaskEditForm(props: propsType) {

    console.log("TaskEditForm render");

    return (
        <OuterDiv
            height={props.outerHeight}
        >
            <MainAreaDiv>
                {/* 入力欄 */}
                {
                    props.refInfoArray &&
                    props.refInfoArray.length > 0 &&
                    <DynamicFormComponent
                        refInfoArray={props.refInfoArray}
                    />
                }
            </MainAreaDiv>
        </OuterDiv>
    );
}

export default TaskEditForm;