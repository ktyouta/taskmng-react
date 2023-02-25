import React, { forwardRef, useState } from 'react';
import './css/VerticalLabellInputComponent.css';
import styled from "styled-components";
import LabelInputComponent from './LabelInputComponent';
import { refType } from './BaseInputComponent';
import LabelComponent from './LabelComponent';

//引数の型
type propsType = {
  editFlg: boolean,
  title: string,
  type?: string,
  value: string,
  lenght: number,
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
        type={props.type ? props.type : "text"}
        editFlg={props.editFlg}
        lenght={props.lenght}
        value={props.value}
        textWidth={props.textWidth}
        ref={ref}
      />
    </div>
  );
})

export default VerticalLabellInputComponent;