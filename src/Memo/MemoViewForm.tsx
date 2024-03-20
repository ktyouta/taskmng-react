import React from 'react';
import '../App.css';
import HorizonLabelItemComponent from '../Common/HorizonLabelItemComponent';
import styled from 'styled-components';
import { displayMemoType, viewMemoType } from './Type/MemoType';
import useMemoViewForm from './Hook/useMemoViewForm';


//引数の型
type propsType = {
    viewMemoList: viewMemoType[],
}

function MemoViewForm(props: propsType) {

    console.log("MemoViewForm render");

    let {
        viewList
    } = useMemoViewForm({ ...props });

    return (
        <React.Fragment>
            {viewList}
        </React.Fragment>
    );
}

export default MemoViewForm;