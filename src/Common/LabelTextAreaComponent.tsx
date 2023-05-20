import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import BaseInputComponent, { refType } from './BaseInputComponent';
import BaseTextAreaComponent from './BaseTextAreaComponent';

//引数の型
type propsType = {
    disabled: boolean,
    value: string,
    lenght: number,
    titleWidth?: string,
    textWidth?: string,
}

const LabelTextAreaComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <React.Fragment>
            {
                !props.disabled ?
                    (
                        <BaseTextAreaComponent
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

export default LabelTextAreaComponent;