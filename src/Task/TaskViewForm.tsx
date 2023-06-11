import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { viewTaskType } from './Type/TaskType';


//引数の型
type propsType = {
    viewTaskList: viewTaskType[],
    titleWitdh?: string,
    listTitleWidth?: string,
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
                            labelWidth={props.titleWitdh}
                            key={`dynamicform-${index}`}
                        >
                            <span>
                                {element.value}
                            </span>
                        </HorizonLabelItemComponent>
                    );
                })
            }
        </React.Fragment>
    );
}

export default TaskViewForm;