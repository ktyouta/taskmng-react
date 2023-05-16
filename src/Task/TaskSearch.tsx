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


function TaskSearch() {

    console.log("TaskSearch render");

    const {
        contentRef,
        clickSearchBtn,
        clickClearBtn,
    } = useTaskSearch();

    return (
        <div className="tasksearch">
            <div className="tasksearch-area">
                <HorizonLabelInputComponent
                    title={"内容"}
                    value={""}
                    lenght={100}
                    disabled={false}
                    ref={contentRef}
                    titleWidth={"100px"}
                />
                <SpaceComponent space={"38%"} />
                <ButtonComponent
                    styleTypeNumber="BASE"
                    title={"クリア"}
                    onclick={clickClearBtn}
                />
                <SpaceComponent space={"1%"} />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"検索"}
                    onclick={clickSearchBtn}
                />
            </div>
        </div>
    );
}

export default React.memo(TaskSearch);