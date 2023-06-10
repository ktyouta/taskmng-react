import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    title: string | JSX.Element,
    width?: string,
    htmlForId?: string,
    key?: string,
    color?: string,
}

//ラベルの基本スタイル
const BaseLabel = styled.label<{ width?: string, color?: string, }>`
  width: ${({ width }) => (width ?? "180px")};
  color: ${({ color }) => (color ?? "")};
`;

const LabelComponent = (props: propsType) => {

    return (
        <BaseLabel
            width={props.width}
            color={props.color}
            htmlFor={props.htmlForId}
            key={props.key}
        >
            {props.title}
        </BaseLabel>
    );
}

export default LabelComponent;