import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import LabelRadioListComponent, { radioType } from './LabelRadioListComponent';
import DatePickerComponent from './DatePickerComponent';

//引数の型
type propsType = {
    title: string,
    titleWidth?: string,
    value?: string,
    onChange?: (e: string) => void,
    disabled?: boolean,
}


const HorizonLabelDatePickerComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-main-area">
            <LabelComponent
                title={props.title}
                width={props.titleWidth}
            />
            <DatePickerComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default HorizonLabelDatePickerComponent;