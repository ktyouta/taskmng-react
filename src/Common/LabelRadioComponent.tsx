import React from 'react';
import '../App.css';
import RadioComponent from './RadioComponent';
import LabelComponent from './LabelComponent';
import styled from 'styled-components';


//ラベルラジオボタンの基本スタイル
const LabelRadioDiv = styled.div`
  display:flex;
  text-align: center;
  width: auto;
  align-items: center;
`;

//引数の型
type propsType = {
    title: string,
    value: string,
    selectedValue: string,
    htmlForId: string,
    onChange: (e: string) => void,
    key: string,
    width?: string,
    disabled?: boolean,
}


function LabelRadioComponent(props: propsType) {

    return (
        <LabelRadioDiv>
            <LabelComponent
                {...props}
            />
            <RadioComponent
                {...props}
            />
        </LabelRadioDiv>
    );
}

export default LabelRadioComponent;