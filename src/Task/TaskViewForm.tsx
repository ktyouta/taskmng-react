import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { displayTaskType, viewTaskType } from './Type/TaskType';


//表示欄のスタイル
const ValueSpan = styled.span`
    width:80%
`;

//太文字のスタイル
const BoldSpan = styled.span`
    font-weight: bold;
`;

//引数の型
type propsType = {
    viewTaskList: displayTaskType,
}

function TaskViewForm(props: propsType) {

    console.log("TaskViewForm render");

    return (
        <React.Fragment>
            {
                props.viewTaskList && props.viewTaskList.default &&
                props.viewTaskList.default.length > 0 &&
                props.viewTaskList.default.map((element, index) => {
                    return (
                        <HorizonLabelItemComponent
                            title={element.title}
                            width="20%"
                            key={`dynamicform-${index}`}
                        >
                            <ValueSpan>
                                {element.value}
                            </ValueSpan>
                        </HorizonLabelItemComponent>
                    );
                })
            }
            {
                props.viewTaskList && props.viewTaskList.customAttribute &&
                props.viewTaskList.customAttribute.length > 0 &&
                <React.Fragment>
                    <HorizonLabelItemComponent
                        title={<BoldSpan>カスタム属性</BoldSpan>}
                        width="20%"
                    >
                    </HorizonLabelItemComponent>
                    {
                        props.viewTaskList.customAttribute.map((element, index) => {
                            return (
                                <HorizonLabelItemComponent
                                    title={element.title}
                                    width="20%"
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
            }
        </React.Fragment>
    );
}

export default TaskViewForm;