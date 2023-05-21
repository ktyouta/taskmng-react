import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';


//引数の型
type propsType = {
    value: string,
    id: string,
    disabled?: boolean,
    onChange?: (e: string) => void,
}

//参照の型
export type checkBoxRefType = {
    refValue: boolean,
    clearValue: () => void
}


const CheckBoxComponent = forwardRef<checkBoxRefType, propsType>((props, ref) => {

    //チェックボックスの入力値
    const [isChecked, setIsChecked] = useState(false);

    //チェックボックスの入力値を割り当てる
    React.useImperativeHandle(ref, () => ({
        refValue: isChecked,
        clearValue: clearInput
    }));

    //チェックボックスのクリックイベント
    const changeInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        //if(props.onChange) props.onChange();
        setIsChecked(!isChecked);
    };

    //チェックボックスのクリアイベント
    const clearInput = () => {
        setIsChecked(false);
    };

    return (
        <input
            type="checkbox"
            onChange={changeInput}
            value={props.value}
            checked={isChecked}
            id={props.id}
            disabled={props.disabled}
        />
    );
})

export default CheckBoxComponent;