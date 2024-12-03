import '../App.css';
import LabelComponent from '../Common/LabelComponent';
import { refInfoType } from '../Common/Type/CommonType';
import styled from 'styled-components';
import { editDisplayTaskType } from './Type/TaskType';
import React from 'react';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import DynamicFormComponent from '../Common/DynamicFormComponent';
import { SnackbarComponent } from '../Common/SnackbarComponent';
import { TASK_SNACKBAR_INNER_STYLE, TASK_SNACKBAR_OUTER_STYLE } from './Const/TaskConst';


//引数の型
type propsType = {
    errMessage: string | undefined,
    onClose: () => void,
}


function TaskErrMessage(props: propsType) {

    console.log("TaskErrMessage render");

    return (
        <React.Fragment>
            {
                props.errMessage &&
                <SnackbarComponent
                    open={!!props.errMessage}
                    message={props.errMessage}
                    severity='error'
                    outerStyle={TASK_SNACKBAR_OUTER_STYLE}
                    innerStyle={TASK_SNACKBAR_INNER_STYLE}
                    onClose={props.onClose}
                />
            }
        </React.Fragment>
    );
}

export default TaskErrMessage;