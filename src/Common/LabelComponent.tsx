import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    title: string,
    width?: string,
    height?: string,
}

//ラベルの基本スタイル
const BaseLabel = styled.label<{ width: string | undefined, height: string | undefined }>`
  width: ${({ width }) => (width ? width : "150px")};
  height:: ${({ width }) => (width ? width : "30px")};
`;

const LabelComponent = (props: propsType) => {

    return (
        <BaseLabel
            width={props.width}
            height={props.height}
        >
            {props.title}
        </BaseLabel>
    );
}

export default LabelComponent;