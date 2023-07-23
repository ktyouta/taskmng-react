import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";

//引数の型
type propsType = {
    type?: string,
    value: string,
    lenght: number,
    titleWidth?: string,
    textWidth?: string,
    bgColor?: string,
    disabled?: boolean,
    onChange?: (e: string) => void,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//テキストボックスの基本スタイル
const BaseInput = styled.input<{ textWidth?: string, bgColor?: string, }>`
  width: ${({ textWidth }) => (textWidth ?? "300px")};
  background-color:${({ bgColor }) => (bgColor ?? "")};
  height:33px;
  border-radius: 5px;
  border:solid 1px rgb(118, 118, 118);
`;

const BaseInputComponent = forwardRef<refType, propsType>((props, ref) => {

    //テキストボックスの入力値
    const [inputValue, setInputValue] = useState<string>(props.value);

    //テキストボックスの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: inputValue,
        clearValue: clearInput
    }));

    //テキストボックスの入力イベント
    const changeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.target.value);
        if (props.onChange) {
            props.onChange(e.target.value);
        }
    };

    //テキストボックスのクリアイベント
    const clearInput = () => {
        setInputValue(props.value);
    };

    return (
        <BaseInput
            type={props.type ? props.type : "text"}
            maxLength={props.lenght}
            onChange={changeInput}
            value={inputValue}
            textWidth={props.textWidth}
            bgColor={props.bgColor}
            disabled={props.disabled}
        />
    );
})

export default BaseInputComponent;