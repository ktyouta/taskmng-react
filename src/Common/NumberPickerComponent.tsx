import React, { forwardRef, useState } from 'react';
import NumberPicker from "react-widgets/NumberPicker";
import "react-widgets/styles.css";

//日付のフォーマット
type dateFormatType = "yyyy/MM/dd" | "yyyy/MM/dd HH:mm";

//引数の型
type propsType = {
    dateFormat?: dateFormatType,
    value: number,
    onChange?: (e: string) => void,
    disabled?: boolean,
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
        }
        else {
            setValue(value);
        }
    };

    return (
            <NumberPicker
                value={value}
                onChange={value => { onChange(value) }}
                disabled={props.disabled}
                min={0}
            />
    );
})

export default NumberPickerComponent;