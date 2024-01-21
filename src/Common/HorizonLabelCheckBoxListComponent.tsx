import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import LabelRadioListComponent, { radioType } from './LabelRadioListComponent';
import LabelCheckBoxListComponent from './LabelCheckBoxListComponent';

//引数の型
type propsType = {
    title: string,
    titleWidth?: string,
    checkBox: radioType[],
    radioLabelWidth?: string,
    htmlForId: string,
    disabled?: boolean,
    initValue: string,
}


const HorizonLabelCheckBoxListComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-main-area">
            <LabelComponent
                {...props}
            />
            <LabelCheckBoxListComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default HorizonLabelCheckBoxListComponent;