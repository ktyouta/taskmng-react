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


function TaskSearch() {

    console.log("TaskSearch render");

    const {
        contentRef,
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        refInfoArray,
        displaySearchConditionList,
    } = useTaskSearch();

    return (
        <div className="tasksearch">
            <div className="tasksearch-area">
                <dl className="tasksearch-condition-area">
                    {displaySearchConditionList}
                </dl>
                <div className="tasksearch-button-area">
                    <ButtonComponent
                        styleTypeNumber="BASE"
                        title={"クリア"}
                        onclick={clickClearBtn}
                    />
                    <SpaceComponent space={"1%"} />
                    <ButtonComponent
                        styleTypeNumber="BASE"
                        title={"検索条件設定"}
                        onclick={openModal}
                    />
                    <SpaceComponent space={"1%"} />
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"検索"}
                        onclick={clickSearchBtn}
                    />
                </div>
            </div>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={closeModal}
            >
                <TaskCondition
                    refInfoArray={refInfoArray}
                    closeFn={closeModal}
                />
            </ModalComponent>
        </div>
    );
}

export default React.memo(TaskSearch);