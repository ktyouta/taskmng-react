import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelRadioComponent from './LabelRadioComponent';
import SpaceComponent from './SpaceComponent';


//ラジオボタンの型
export type radioType = {
    label: string,
    value: string,
}

//引数の型
type propsType = {
    radioList: radioType[],
    selectedValue: string,
    htmlForId?: string,
    disabled?: boolean,
    width?: string,
    onChange?: (e: string) => void,
    radioGap?: string
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//ラジオボタンリストの基本スタイル
const RadioListDiv = styled.div`
  display:flex;
  flex-wrap: wrap;
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
        if (props.onChange) props.onChange(e);
    };

    //ラジオボタンの初期化
    const clearRadio = () => {
        setRadioValue(props.selectedValue);
    };

    return (
        <RadioListDiv>
            {
                props.radioList.map((element, index) => {
                    let tmpTime = new Date().getTime();
                    return (
                        <React.Fragment>
                            <LabelRadioComponent
                                key={props.htmlForId ? `${props.htmlForId}-${element.value}` : element.value}
                                title={element.label}
                                value={element.value}
                                selectedValue={radioValue}
                                onChange={changeRadio}
                                htmlForId={props.htmlForId ? `${props.htmlForId}-${element.value}-${element.label}-${tmpTime}` : element.value}
                                width={props.width}
                                disabled={props.disabled}
                            />
                            <SpaceComponent
                                key={`labelradiospace-${props.htmlForId ? `${props.htmlForId}-${element.value}` : element.value}`}
                                space={props.radioGap ? props.radioGap : '70px'}
                            />
                        </React.Fragment>
                    );
                })
            }
        </RadioListDiv>
    );
})

export default LabelRadioListComponent;