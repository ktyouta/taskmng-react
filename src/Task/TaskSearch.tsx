import React, { useState } from 'react';
import '../App.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ButtonComponent from '../Common/ButtonComponent';
import MessageComponent from '../Common/MessageComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import TableComponent from '../Common/TableComponent';
import useTaskTop from './Hook/useTaskTop';
import { refType } from '../Common/BaseInputComponent';
import useTaskSearch from './Hook/useTaskSearch';



function TaskSearch() {

    console.log("TaskSearch render");

    const {
        contentRef,
        clickSearchBtn,
        clickClearBtn,
    } = useTaskSearch();

    return (
        <div className="tasktablecomponent">
            <div className="tasktablecomponent-search-area">
                <HorizonLabelInputComponent
                    title={"内容"}
                    value={""}
                    lenght={100}
                    editFlg={true}
                    ref={contentRef}
                    titleWidth={"100px"}
                />
                <SpaceComponent space={"38%"} />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"クリア"}
                    onclick={clickClearBtn}
                />
                <SpaceComponent space={"1%"} />
                <ButtonComponent
                    styleTypeNumber="RUN"
                    title={"フィルター"}
                    onclick={clickSearchBtn}
                />
            </div>
            {/* <div className="tasktablecomponent-message-area">
                <div style={{ width: "75%" }}>
                    {
                        isDisplayMessage && <MessageComponent message={"該当するデータがありません。"} styleTypeNumber={labelType.danger} />
                    }
                </div>
                <SpaceComponent space={"9%"} />
                <ResultNumComponent num={resultNum} />
            </div> */}
        </div>
    );
}

export default React.memo(TaskSearch);