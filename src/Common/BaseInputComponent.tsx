import React, { forwardRef, useEffect, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";

//引数の型
type propsType = {
    type?: string,
    value?: string,
    length?: number,
    titleWidth?: string,
    textWidth?: string,
    bgColor?: string,
    disabled?: boolean,
    onChange?: (e: string) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    placeholder?: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//テキストボックスの基本スタイル
const BaseInput = styled.input<{ textWidth?: string, bgColor?: string, }>`
  width: ${({ textWidth }) => (textWidth ?? "400px")};
  background-color:${({ bgColor }) => (bgColor ?? "")};
  height:33px;
  border-radius: 5px;
  border:solid 1px rgb(118, 118, 118);
`;

const BaseInputComponent = forwardRef<refType, propsType>((props, ref) => {

    //テキストボックスの入力値
    const [inputValue, setInputValue] = useState<string>(props.value ?? "");

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

    //キー押下イベント
    const inputEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    };

    //テキストボックスのクリアイベント
    const clearInput = () => {
        setInputValue(props.value ?? "");
    };

    useEffect(() => {
        setInputValue(props.value ?? "");
    }, [props.value]);

    return (
        <BaseInput
            type={props.type ? props.type : "text"}
            maxLength={props.length}
            onChange={changeInput}
            value={inputValue}
            textWidth={props.textWidth}
            bgColor={props.bgColor}
            disabled={props.disabled}
            onKeyDown={inputEnterKey}
            placeholder={props.placeholder}
        />
    );
})

export default BaseInputComponent;