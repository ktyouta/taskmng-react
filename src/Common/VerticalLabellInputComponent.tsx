import React, { forwardRef, useState } from 'react';
import './css/VerticalLabellInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';

//引数の型
type propsType = {
  disabled: boolean,
  title: string,
  type?: string,
  value: string,
  length: number,
  titleWidth?: string,
  textWidth?: string,
}

//ラベルの基本スタイル
const BaseLabel = styled.label<{ titleWidth: string | undefined }>`
  width: ${({ titleWidth }) => (titleWidth ? titleWidth : "150px")};
  height:30px;
`;

const VerticalLabellInputComponent = forwardRef<refType, propsType>((props, ref) => {

  return (
    <div className="input-vertical-area">
      <LabelComponent
        title={props.title}
        width={props.titleWidth}
      />
      <LabelInputComponent
        {...props}
        ref={ref}
      />
    </div>
  );
})

export default VerticalLabellInputComponent;