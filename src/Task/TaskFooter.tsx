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
import styled from 'styled-components';
import PagenatetionComponent from '../Common/PagenatetionComponent';


//引数の型
type propsType = {
    deleteSelectedTasks: () => void,
}

//フッターのスタイル
const TaskFooterDiv = styled.div`
    display: flex;
    align-items: center;
    height: 15%;
    padding-right: 5%;
    box-sizing: border-box;
    padding-left: 2%;
`;

//ボタン間隔
const SpaceDiv = styled.div`
    flex:1;
`;

function TaskFooter(props: propsType) {

    console.log("TaskFooter render");

    const {
        isModalOpen,
        onFlag,
        offFlag,
        pageNum,
        changePage,
    } = useTaskFooter();

    return (
        <React.Fragment>
            <TaskFooterDiv>
                <PagenatetionComponent
                    changePage={changePage}
                    totalPage={pageNum}
                />
                <SpaceDiv />
                <ButtonComponent
                    styleTypeNumber="GRAD_RED"
                    title={"まとめて削除"}
                    onclick={props.deleteSelectedTasks}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "10%",
                        "height": "39%",
                    }}
                />
                <SpaceComponent
                    space={"1%"}
                />
                <ButtonComponent
                    styleTypeNumber="GRAD_GREEN"
                    title={"タスク作成"}
                    onclick={onFlag}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "10%",
                        "height": "39%",
                    }}
                />
            </TaskFooterDiv>
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