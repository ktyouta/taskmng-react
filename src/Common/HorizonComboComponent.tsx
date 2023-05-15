import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';
import ComboComponent, { comboType } from './ComboComponent';

//引数の型
type propsType = {
    title: string,
    titleWidth?: string,
    combo: comboType[],
    onChange?: (e: string) => void,
    initValue: string,
}

const HorizonComboComponent = forwardRef<refType, propsType>((props, ref) => {

    return (
        <div className="input-main-area">
            <LabelComponent
            {...props}
            />
            <ComboComponent
                {...props}
                ref={ref}
            />
        </div>
    );
})

export default HorizonComboComponent;