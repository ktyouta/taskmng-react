import React, { forwardRef, useState } from 'react';
import './css/VerticalLabellInputComponent.css';
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
    onChange?: (e: string) => void,
}


const VerticalLabelDatePickerComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-vertical-area">
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

export default VerticalLabelDatePickerComponent;