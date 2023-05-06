import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelRadioComponent from './LabelRadioComponent';


//ラジオボタンの型
export type radioType = {
    title: string,
    value: string,
}

//引数の型
type propsType = {
    radioList: radioType[],
    selectedValue: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}


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
        <React.Fragment>
            {
                props.radioList.map((element) => {
                    return (
                        <LabelRadioComponent
                            title={element.title}
                            value={element.value}
                            selectedValue={props.selectedValue}
                            onChange={changeRadio}
                        />
                    );
                })
            }
        </React.Fragment>
    );
})

export default LabelRadioListComponent;