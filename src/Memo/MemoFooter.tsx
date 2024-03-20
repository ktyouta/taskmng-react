import React, { useState } from 'react';
import '../App.css';
import VerticalLabellInputComponent from '../Common/VerticalLabellInputComponent';
import useMemoFooter from './Hook/useMemoFooter';
import ButtonComponent from '../Common/ButtonComponent';
import SpaceComponent from '../Common/SpaceComponent';
import './css/MemoFooter.css';
import LabelRadioListComponent from '../Common/LabelRadioListComponent';
import VerticalLabelRadioListComponent from '../Common/VerticalLabelRadioListComponent';
import DatePickerComponent from '../Common/DatePickerComponent';
import VerticalLabelDatePickerComponent from '../Common/VerticalLabelDatePickerComponent';
import WaitLoading from '../Common/WaitLoading';
import ModalComponent from '../Common/ModalComponent';
import MemoRegister from './MemoRegister';
import styled from 'styled-components';


//フッターのスタイル
const MemoFooterDiv = styled.div`
    display: flex;
    align-items: center;
    height: 15%;
    padding: 0% 0% 0% 2%;
`;


function MemoFooter() {

    console.log("MemoFooter render");

    const {
        isModalOpen,
        onFlag,
        offFlag, } = useMemoFooter();

    return (
        <React.Fragment>
            <MemoFooterDiv>
                <SpaceComponent
                    space={"85%"}
                />
                <ButtonComponent
                    styleTypeNumber="PRIMARY"
                    title={"メモ作成"}
                    onclick={onFlag}
                />
            </MemoFooterDiv>
            <ModalComponent
                modalIsOpen={isModalOpen}
                closeModal={offFlag}
            >
                <MemoRegister
                    closeFn={offFlag}
                />
            </ModalComponent>
        </React.Fragment>
    );
}

export default MemoFooter;