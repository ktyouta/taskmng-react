import React, { forwardRef, useState } from 'react';
import './css/VerticalLabellInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import LabelRadioListComponent, { radioType } from './LabelRadioListComponent';

//引数の型
type propsType = {
    title: string,
    radioList: radioType[],
    selectedValue: string,
    labelWidth?: string,
}


const VerticalLabelRadioListComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-vertical-area">
            <LabelComponent
                title={props.title}
            />
            <LabelRadioListComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default VerticalLabelRadioListComponent;