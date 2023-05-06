import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    title: string,
    width?: string,
}

//ラベルの基本スタイル
const BaseLabel = styled.label<{ width: string | undefined }>`
  width: ${({ width }) => (width ? width : "150px")};
`;

const LabelComponent = (props: propsType) => {

    return (
        <BaseLabel
            width={props.width}
        >
            {props.title}
        </BaseLabel>
    );
}

export default LabelComponent;