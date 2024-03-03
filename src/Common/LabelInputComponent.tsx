import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import BaseInputComponent, { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    disabled: boolean,
    type?: string,
    value: string,
    length: number,
    titleWidth?: string,
    textWidth?: string,
    bgColor?: string,
    onChange?: (e: string) => void,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}

const LabelInputComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <React.Fragment>
            {
                !props.disabled ?
                    (
                        <BaseInputComponent
                            {...props}
                            ref={ref}
                        />
                    )
                    :
                    <label>{props.value}</label>
            }
        </React.Fragment>
    );
})

export default LabelInputComponent;