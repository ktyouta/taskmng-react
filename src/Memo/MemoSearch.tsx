import React, { useState } from 'react';
import '../App.css';
import HorizonLabelInputComponent from '../Common/HorizonLabelInputComponent';
import SpaceComponent from '../Common/SpaceComponent';
import ButtonComponent from '../Common/ButtonComponent';
import MessageComponent from '../Common/MessageComponent';
import ResultNumComponent from '../Common/ResultNumComponent';
import TableComponent from '../Common/TableComponent';
import { refType } from '../Common/BaseInputComponent';
import useMemoSearch from './Hook/useMemoSearch';
import './css/MemoSearch.css';
import ModalComponent from '../Common/ModalComponent';
import MemoCondition from './MemoCondition';
import { HeightDiv } from '../Common/StyledComponent/CommonStyledComponent';
import styled from 'styled-components';


const MemoSearchAreaDiv = styled.div`
    height: 100%;
    display: flex;
    /* padding-bottom: 2%; */
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    align-items: center;
    flex-wrap: wrap;
`;

const MemoSearchConditionAreaDiv = styled.dl`
    display: flex;
    width: 70%;
    align-items: center;
    flex-wrap: wrap;
`;

const MemoSearchButtonAreaDiv = styled.div`
    height: 100%;
    display: flex;
    width: 30%;
    align-items: center;
`;

function MemoSearch() {

    console.log("MemoSearch render");

    const {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModal,
        memoSearchRefInfo,
        displaySearchConditionList,
    } = useMemoSearch();

    return (
        <HeightDiv
            height='18%'
        >
            <MemoSearchAreaDiv>
                <MemoSearchConditionAreaDiv>
                    {displaySearchConditionList}
                </MemoSearchConditionAreaDiv>
                <MemoSearchButtonAreaDiv>
                    <ButtonComponent
                        styleTypeNumber="BASE"
                        title={"リセット"}
                        onclick={clickClearBtn}
                        style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                    />
                    <SpaceComponent space={"1%"} />
                    <ButtonComponent
                        styleTypeNumber="BASE"
                        title={"検索条件設定"}
                        onclick={openModal}
                        style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                    />
                    <SpaceComponent space={"1%"} />
                    <ButtonComponent
                        styleTypeNumber="RUN"
                        title={"検索"}
                        onclick={clickSearchBtn}
                        style={{ "borderRadius": "15px", "fontWeight": "bold", "fontSize": "0.9rem" }}
                    />
                </MemoSearchButtonAreaDiv>
            </MemoSearchAreaDiv>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={closeModal}
            >
                <MemoCondition
                    memoSearchRefInfo={memoSearchRefInfo}
                    closeFn={closeModal}
                />
            </ModalComponent>
        </HeightDiv>
    );
}

export default MemoSearch;