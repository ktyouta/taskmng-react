import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { displayTaskType, viewTaskType } from './Type/TaskType';
import useTaskViewForm from './Hook/useTaskViewForm';


//引数の型
type propsType = {
    viewTaskList: viewTaskType[],
}

function TaskViewForm(props: propsType) {

    console.log("TaskViewForm render");

    let {
        viewList
    } = useTaskViewForm({ ...props });

    return (
        <React.Fragment>
            {viewList}
        </React.Fragment>
    );
}

export default TaskViewForm;