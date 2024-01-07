import React, { forwardRef, useState } from 'react';
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";
import styled from 'styled-components';


//日付のフォーマット
type dateFormatType = "yyyy/MM/dd" | "yyyy/MM/dd HH:mm";

//引数の型
type propsType = {
    dateFormat?: dateFormatType,
    value: number,
    onChange?: (e: number) => void,
    disabled?: boolean,
    bgColor?: string,
}

//参照の型
export type refType = {
    refValue: string,
    clearValue: () => void
}


const NumberPickerComponent = forwardRef<refType, propsType>((props, ref) => {

    const [value, setValue] = useState<number>(props.value);

    //NumberPickerの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: value.toString(),
        clearValue: clearInput
    }));

    //クリアイベント
    const clearInput = () => {
        setValue(props.value);
    };

    const onChange = (value: number | null) => {
        if (!value || isNaN(Number(value))) {
            setValue(0);
            return;
        }
        setValue(value);
        if (props.onChange) {
            props.onChange(value);
        }
    };

    return (
        <NumberPicker
            value={value}
            onChange={value => { onChange(value) }}
            disabled={props.disabled}
            min={0}
            style={{ backgroundColor: props.bgColor ?? "" }}
        />
    );
})

export default NumberPickerComponent;