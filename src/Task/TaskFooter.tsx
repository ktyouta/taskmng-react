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


//フッターのスタイル
const TaskFooterDiv = styled.div`
    display: flex;
    align-items: center;
    height: 15%;
    padding: 0% 0% 0% 2%;
    position:relative;
`;

//ページネーションのスタイル
const PagenateDiv = styled.div`
    position: absolute;
    left: 32%;
`;


function TaskFooter() {

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
                <PagenateDiv>
                    <PagenatetionComponent
                        changePage={changePage}
                        totalPage={pageNum}
                    />
                </PagenateDiv>
                <ButtonComponent
                    styleTypeNumber="GRAD_GREEN"
                    title={"タスク作成"}
                    onclick={onFlag}
                    style={{
                        "fontSize": "0.9rem",
                        "position": "absolute",
                        "left": "84%",
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