import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";

//引数の型
type propsType = {
    value: string,
    lenght: number,
    titleWidth?: string,
    textWidth?: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}

//テキストエリアの基本スタイル
const BaseInput = styled.textarea<{ textWidth: string | undefined }>`
  width: ${({ textWidth }) => (textWidth ? textWidth : "300px")};
  height:70px;
  width: 40%;
  border-radius: 5px;
  border:solid 1px rgb(118, 118, 118);
`;

const BaseTextAreaComponent = forwardRef<refType, propsType>((props, ref) => {

    //テキストエリアの入力値
    const [inputValue, setInputValue] = useState<string>(props.value);

    //テキストエリアの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: inputValue,
        clearValue: clearInput
    }));

    //テキストエリアの入力イベント
    const changeInput: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setInputValue(e.target.value);
    };

    //テキストエリアのクリアイベント
    const clearInput = () => {
        setInputValue(props.value);
    };

    return (
        <BaseInput
            maxLength={props.lenght}
            onChange={changeInput}
            value={inputValue}
            textWidth={props.textWidth}
        />
    );
})

export default BaseTextAreaComponent;