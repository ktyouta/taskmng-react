import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import BaseInputComponent, { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    editFlg: boolean,
    type?: string,
    value: string,
    lenght: number,
    titleWidth?: string,
    textWidth?: string,
}

const LabelInputComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <React.Fragment>
            {
                props.editFlg ?
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