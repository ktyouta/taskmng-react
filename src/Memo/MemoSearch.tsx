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

const MemoSearchConditionAreaDiv = styled.div`
    width: 67%;
    height:100%;
`;

const MemoSearchConditionAreaDl = styled.dl`
    display: flex;
    width: 70%;
    height:50%;
    align-items: center;
    flex-wrap: wrap;
    padding: 2% 0 0 0;
    margin: 0;
    box-sizing: border-box;
`;

const MemoSearchTagAreaDiv = styled.div`
    display: flex;
    width: 70%;
    height:50%;
    align-items: center;
    flex-wrap: wrap;
`;

const MemoSearchButtonAreaDiv = styled.div`
    height: 100%;
    display: flex;
    width: 32%;
    align-items: center;
`;

function MemoSearch() {

    console.log("MemoSearch render");

    const {
        clickSearchBtn,
        clickClearBtn,
        isModalOpen,
        openModal,
        closeModalSetCondition,
        memoSearchRefInfo,
        displaySearchConditionList,
        displayTagList,
        closeModal
    } = useMemoSearch();

    return (
        <HeightDiv
            height='18%'
        >
            <MemoSearchAreaDiv>
                <MemoSearchConditionAreaDiv>
                    <MemoSearchConditionAreaDl>
                        {displaySearchConditionList}
                    </MemoSearchConditionAreaDl>
                    {/* 検索条件に指定されているタグリスト */}
                    <MemoSearchTagAreaDiv>
                        {displayTagList}
                    </MemoSearchTagAreaDiv>
                </MemoSearchConditionAreaDiv>
                <MemoSearchButtonAreaDiv>
                    <ButtonComponent
                        styleTypeNumber="GRAD_GRAY"
                        title={"リセット"}
                        onclick={clickClearBtn}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "39%",
                            "width": "50%",
                        }}
                    />
                    <SpaceComponent space={"3%"} />
                    <ButtonComponent
                        styleTypeNumber="GRAD_GRAY"
                        title={"検索条件設定"}
                        onclick={openModal}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "39%",
                            "width": "50%",
                        }}
                    />
                    <SpaceComponent space={"3%"} />
                    <ButtonComponent
                        styleTypeNumber="GRAD_BLUE"
                        title={"検索"}
                        onclick={clickSearchBtn}
                        style={{
                            "fontSize": "0.9rem",
                            "height": "39%",
                            "width": "50%",
                        }}
                    />
                </MemoSearchButtonAreaDiv>
            </MemoSearchAreaDiv>
            {/* 検索条件設定モーダル */}
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={closeModal}
            >
                <MemoCondition
                    memoSearchRefInfo={memoSearchRefInfo}
                    closeFn={closeModalSetCondition}
                    closeModal={closeModal}
                />
            </ModalComponent>
        </HeightDiv>
    );
}

export default MemoSearch;