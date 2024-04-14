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
    padding: 0% 0% 0% 2%;
    position:relative;
`;

//ページネーションのスタイル
const PagenateDiv = styled.div`
    position: absolute;
    left: 35%;
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
                <PagenateDiv>
                    <PagenatetionComponent
                        changePage={changePage}
                        totalPage={pageNum}
                    />
                </PagenateDiv>
                <ButtonComponent
                    styleTypeNumber="PRIMARY"
                    title={"メモ作成"}
                    onclick={clickCreateBtn}
                    style={{
                        "borderRadius": "15px",
                        "fontWeight": "bold",
                        "fontSize": "0.9rem",
                        "position": "absolute",
                        "left": "86%"
                    }}
                />
            </MemoFooterDiv>
        </React.Fragment>
    );
}

export default MemoFooter;