import React, { forwardRef, useState } from 'react';
import './css/HorizonLabelInputComponent.css';
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

const HorizonLabelInputComponent = forwardRef<refType, propsType>((props, ref) => {

  return (
    <div className="input-main-area">
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

export default HorizonLabelInputComponent;