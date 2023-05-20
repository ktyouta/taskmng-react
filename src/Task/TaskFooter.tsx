import React, { useState } from 'react';
import '../App.css';
import VerticalLabellInputComponent from '../Common/VerticalLabellInputComponent';
import useTaskFooter from './Hook/useTaskFooter';
import ButtonComponent from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import './css/TaskFooter.css';
import LabelRadioListComponent from '../Common/LabelRadioListComponent';
import VerticalLabelRadioListComponent from '../Common/VerticalLabelRadioListComponent';
import DatePickerComponent from '../Common/DatePickerComponent';
import VerticalLabelDatePickerComponent from '../Common/VerticalLabelDatePickerComponent';
import WaitLoading from '../Common/WaitLoading';
import ModalComponent from '../Common/ModalComponent';
import TaskRegister from './TaskRegister';


function TaskFooter() {

    console.log("TaskFooter render");

    const {
        isModalOpen,
        onFlag,
        offFlag, } = useTaskFooter();

    return (
        <React.Fragment>
            <div className="taskfooter">
                <SpaceComponent
                    space={"85%"}
                />
                <ButtonComponent
                    styleTypeNumber="PRIMARY"
                    title={"タスク作成"}
                    onclick={onFlag}
                />
            </div>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <TaskRegister
                    closeFn={offFlag}
                />
            </ModalComponent>
        </React.Fragment>
    );
}

export default TaskFooter;