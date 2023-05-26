import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';


//引数の型
type propsType = {
    value: string,
    htmlForId: string,
    disabled?: boolean,
    onChange?: (e: string) => void,
    initValue: boolean,
}

//参照の型
export type checkBoxRefType = {
    refValue: boolean,
    clearValue: () => void
}


const CheckBoxComponent = forwardRef<checkBoxRefType, propsType>((props, ref) => {

    //チェックボックスの入力値
    const [isChecked, setIsChecked] = useState(props.initValue);

    //チェックボックスの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: isChecked,
        clearValue: clearInput
    }));

    //チェックボックスのクリックイベント
    const changeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (props.onChange) props.onChange(e.target.value);
        setIsChecked(!isChecked);
    };

    //チェックボックスのクリアイベント
    const clearInput = () => {
        setIsChecked(props.initValue);
    };

    return (
        <input
            type="checkbox"
            onChange={changeInput}
            value={props.value}
            checked={isChecked}
            id={props.htmlForId}
            disabled={props.disabled}
        />
    );
})

export default CheckBoxComponent;