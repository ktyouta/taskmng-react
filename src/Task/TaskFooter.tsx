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


function TaskFooter() {

    console.log("TaskFooter render");

    const {
        taskContentRef,
        selectedPriorityRef,
        priorityList,
        limitDateRef,
        create,
        clearButtonFunc,
        isLoading, } = useTaskFooter();

    return (
        <React.Fragment>
            <div className="taskfooter">
                <VerticalLabellInputComponent
                    title={"タスク内容"}
                    value={""}
                    lenght={100}
                    disabled={false}
                    ref={taskContentRef}
                    textWidth={"350px"}
                    titleWidth={"100px"}
                />
                <SpaceComponent
                    space={"1%"}
                />
                {
                    priorityList && priorityList.length > 0 &&
                    <VerticalLabelRadioListComponent
                        title='優先度'
                        titleWidth="100px"
                        radioLabelWidth='75px'
                        radioList={priorityList}
                        selectedValue={priorityList[0].value}
                        ref={selectedPriorityRef}
                    />
                }
                <SpaceComponent
                    space={"3%"}
                />
                <VerticalLabelDatePickerComponent
                    title={'期限'}
                    titleWidth="50px"
                    ref={limitDateRef}
                />
                <SpaceComponent
                    space={"7%"}
                />
                <ButtonComponent
                    styleTypeNumber="BASE"
                    title={"クリア"}
                    onclick={clearButtonFunc}
                />
                <SpaceComponent
                    space={"2%"}
                />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"登録"}
                    onclick={create}
                />
            </div>
            <WaitLoading
                isLoading={isLoading}
            />
        </React.Fragment>
    );
}

export default TaskFooter;