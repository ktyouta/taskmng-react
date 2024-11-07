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
import PagenatetionComponent from '../Common/PagenatetionComponent';


//フッターのスタイル
const MemoFooterDiv = styled.div`
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

//引数の型
type propsType = {
    path: string,
}


function MemoFooter(props: propsType) {

    console.log("MemoFooter render");

    const {
        clickCreateBtn,
        pageNum,
        changePage,
    } = useMemoFooter({ ...props });

    return (
        <React.Fragment>
            <MemoFooterDiv>
                <PagenatetionComponent
                    changePage={changePage}
                    totalPage={pageNum}
                />
                <SpaceDiv />
                <ButtonComponent
                    styleTypeNumber="GRAD_GREEN"
                    title={"メモ作成"}
                    onclick={clickCreateBtn}
                    style={{
                        "fontSize": "0.9rem",
                        "width": "10%",
                        "height": "39%",
                    }}
                />
            </MemoFooterDiv>
        </React.Fragment>
    );
}

export default MemoFooter;