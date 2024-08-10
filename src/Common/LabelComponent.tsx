import React, { forwardRef, ReactNode, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';

//引数の型
type propsType = {
    title: ReactNode,
    width?: string,
    htmlForId?: string,
    key?: string,
    color?: string,
    height?: string,
}

//ラベルの基本スタイル
const BaseLabel = styled.label<{ width?: string, color?: string, height?: string, }>`
  width: ${({ width }) => (width ?? "auto")};
  color: ${({ color }) => (color ?? "")};
  height: ${({ height }) => (height ?? "100%")};
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