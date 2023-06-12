import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { viewTaskType } from './Type/TaskType';


//表示欄のスタイル
const ValueSpan = styled.span`
    width:80%
`;

//引数の型
type propsType = {
    viewTaskList: viewTaskType[],
}

function TaskViewForm(props: propsType) {

    console.log("TaskViewForm render");

    return (
        <React.Fragment>
            {
                props.viewTaskList.map((element, index) => {
                    return (
                        <HorizonLabelItemComponent
                            title={element.title}
                            labelWidth="20%"
                            key={`dynamicform-${index}`}
                        >
                            <ValueSpan>
                                {element.value}
                            </ValueSpan>
                        </HorizonLabelItemComponent>
                    );
                })
            }
        </React.Fragment>
    );
}

export default TaskViewForm;