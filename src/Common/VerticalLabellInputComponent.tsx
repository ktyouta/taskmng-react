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
  onChange?: (e: string) => void,
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void,
}


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