import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import LabelTextAreaComponent from './LabelTextAreaComponent';

//引数の型
type propsType = {
    disabled: boolean,
    title: string,
    value: string,
    length: number,
    titleWidth?: string,
    textWidth?: string,
}

const HorizonLabelTextAreaComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-main-area">
            <LabelComponent
                title={props.title}
                width={props.titleWidth}
            />
            <LabelTextAreaComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default HorizonLabelTextAreaComponent;