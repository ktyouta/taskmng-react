import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelRadioComponent from './LabelRadioComponent';


//ラジオボタンの型
export type radioType = {
    label: string,
    value: string,
}

//引数の型
type propsType = {
    radioList: radioType[],
    selectedValue: string,
    radioLabelWidth?: string,
    htmlForId?: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//ラジオボタンリストの基本スタイル
const RadioListDiv = styled.div`
  display:flex;
`;


const LabelRadioListComponent = forwardRef<refType, propsType>((props, ref) => {

    //ラジオボタンの選択値
    const [radioValue, setRadioValue] = useState<string>(props.selectedValue);

    //ラジオボタンの選択値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: radioValue,
        clearValue: clearRadio
    }));

    //ラジオボタンのクリックイベント
    const changeRadio = (e: string) => {
        setRadioValue(e);
    };

    //ラジオボタンの初期化
    const clearRadio = () => {
        setRadioValue(props.selectedValue);
    };

    return (
        <RadioListDiv>
            {
                props.radioList.map((element) => {
                    return (
                        <LabelRadioComponent
                            key={element.value}
                            title={element.label}
                            value={element.value}
                            selectedValue={radioValue}
                            onChange={changeRadio}
                            htmlForId={props.htmlForId ? `${props.htmlForId}${element.value}` : element.value}
                            width={props.radioLabelWidth}
                        />
                    );
                })
            }
        </RadioListDiv>
    );
})

export default LabelRadioListComponent;