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
                        styleTypeNumber="BASE"
                        title={"リセット"}
                        onclick={clickClearBtn}
                        style={{
                            "borderRadius": "10px",
                            "fontWeight": "bold",
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                            "box-shadow": "0 1px 5px 0 rgba(45, 54, 65, 0.75)",
                            "border": "none",
                            "background": "linear-gradient(to right, #29323c, #485563, #2b5876)",
                            "color": "white",
                        }}
                    />
                    <SpaceComponent space={"2%"} />
                    <ButtonComponent
                        styleTypeNumber="BASE"
                        title={"検索条件設定"}
                        onclick={openModal}
                        style={{
                            "borderRadius": "10px",
                            "fontWeight": "bold",
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                            "box-shadow": "0 1px 5px 0 rgba(45, 54, 65, 0.75)",
                            "border": "none",
                            "background": "linear-gradient(to right, #29323c, #485563, #2b5876)",
                            "color": "white",
                        }}
                    />
                    <SpaceComponent space={"2%"} />
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"検索"}
                        onclick={clickSearchBtn}
                        style={{
                            "borderRadius": "10px",
                            "fontWeight": "bold",
                            "fontSize": "0.9rem",
                            "height": "42%",
                            "width": "38%",
                            "background": "linear-gradient(to right, #3f86ed, #25aae1)",
                            "border": "none",
                            "box-shadow": "0 1px 7px 0 rgba(49, 196, 190, 0.55)",
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