import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import LabelRadioListComponent, { radioType } from './LabelRadioListComponent';

//引数の型
type propsType = {
    title: string,
    titleWidth?: string,
    radioList: radioType[],
    selectedValue: string,
    radioLabelWidth?: string,
    htmlForId?: string,
    disabled?: boolean,
}


const HorizonLabelRadioListComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-main-area">
            <LabelComponent
                {...props}
            />
            <LabelRadioListComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default HorizonLabelRadioListComponent;