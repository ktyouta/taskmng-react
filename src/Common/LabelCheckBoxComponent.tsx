import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import BaseInputComponent, { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import RadioComponent from './RadioComponent';
import CheckBoxComponent, { checkBoxRefType } from './CheckBoxComponent';

//引数の型
type propsType = {
    title: string,
    value: string,
    id: string,
    onChange?: (e: string) => void,
    width?: string,
    disabled?: boolean,
}

const LabelCheckBoxComponent = forwardRef<checkBoxRefType, propsType>((props, ref) => {

    return (
        <React.Fragment>
            <LabelComponent
                {...props}
            />
            <CheckBoxComponent
                {...props}
            />
        </React.Fragment>
    );
})

export default LabelCheckBoxComponent;