import React, { useState } from 'react';
import '../App.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ButtonComponent from '../Common/ButtonComponent';
import MessageComponent from '../Common/MessageComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import TableComponent from '../Common/TableComponent';
import { refType } from '../Common/BaseInputComponent';
import useTaskSearch from './Hook/useTaskSearch';
import './css/TaskSearch.css';
import ModalComponent from '../Common/ModalComponent';
import TaskCondition from './TaskCondition';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


const TaskSearchAreaDiv = styled.div`
    height: 100%;
    display: flex;
    /* padding-bottom: 2%; */
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    align-items: center;
    flex-wrap: wrap;
`;

const TaskSearchConditionAreaDiv = styled.dl`
    display: flex;
    width: 67%;
    align-items: center;
    flex-wrap: wrap;
`;

const TaskSearchButtonAreaDiv = styled.div`
    height: 100%;
    display: flex;
    width: 32%;
    align-items: center;
`;

function TaskSearch() {

    console.log("TaskSearch render");

    const {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        taskSearchRefInfo,
        displaySearchConditionList,
    } = useTaskSearch();

    return (
        <HeightDiv
            height='17%'
        >
            <TaskSearchAreaDiv>
                <TaskSearchConditionAreaDiv>
                    {displaySearchConditionList}
                </TaskSearchConditionAreaDiv>
                <TaskSearchButtonAreaDiv>
                    <ButtonComponent
                        styleTypeNumber="GRAD_GRAY"
                        title={"リセット"}
                        onclick={clickClearBtn}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                        }}
                    />
                    <SpaceComponent space={"2%"} />
                    <ButtonComponent
                        styleTypeNumber="GRAD_GRAY"
                        title={"検索条件設定"}
                        onclick={openModal}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                        }}
                    />
                    <SpaceComponent space={"2%"} />
                    <ButtonComponent
                        styleTypeNumber="GRAD_BLUE"
                        title={"検索"}
                        onclick={clickSearchBtn}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                        }}
                    />
                </TaskSearchButtonAreaDiv>
            </TaskSearchAreaDiv>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={closeModal}
            >
                <TaskCondition
                    taskSearchRefInfo={taskSearchRefInfo}
                    closeFn={closeModal}
                />
            </ModalComponent>
        </HeightDiv>
    );
}

export default TaskSearch;