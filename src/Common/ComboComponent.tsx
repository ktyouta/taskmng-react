import React, { forwardRef, useState } from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
  combo: comboType[],
  onChange?: (e: string) => void,
  initValue: string,
  disabled?: boolean,
  bgColor?: string,
  height?: string,
  width?: string,
  minWidth?: string,
  minHeight?: string,
  selectStyle?: { [key: string]: string },
  optionStyle?: { [key: string]: string },
  id?: string,
}

//コンボボックスの型
export type comboType = {
  value: string,
  label: string
}

//参照の型
export type refType = {
  refValue: string,
  clearValue: () => void
}


//コンボボックスの基本スタイル
const BaseSelect = styled.select<{ bgColor?: string, height?: string, width?: string, minWidth?: string, minHeight?: string }>`
  background-color:${({ bgColor }) => (bgColor ?? "")};
  text-align:center;
  width: ${({ width }) => (width ?? "300px")};
  min-width: ${({ minWidth }) => (minWidth ?? "200px")};
  height:${({ height }) => (height ?? "45px")};
  min-height:${({ minHeight }) => (minHeight ?? "30px")};
  border-radius: 5px;
`;


const ComboComponent = forwardRef<refType, propsType>((props, ref) => {

  //コンボボックスの選択値
  const [selectValue, setSelectValue] = useState<string>(props.initValue);

  //コンボボックスの選択値を割り当てる
  React.useImperativeHandle(ref, () => ({
    refValue: selectValue,
    clearValue: clearInput
  }));

  //コンボボックスの切り替えイベント
  const change: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
    setSelectValue(e.target.value);
  }

  //コンボボックスのクリアイベント
  const clearInput = () => {
    setSelectValue(props.initValue);
  };


  return (
    <React.Fragment>
      {
        props.combo && props.combo.length > 0 &&
        <BaseSelect
          onChange={change}
          value={selectValue}
          disabled={props.disabled}
          bgColor={props.bgColor}
          height={props.height}
          width={props.width}
          minHeight={props.minHeight}
          minWidth={props.minWidth}
          style={props.selectStyle}
          id={props.id}
        >
          {
            props.combo.map((element) => {
              return (
                <option
                  value={element.value}
                  key={`${element.value}-${element.label}`}
                  style={props.optionStyle}
                >
                  {element.label}
                </option>
              );
            })
          }
        </BaseSelect>
      }
    </React.Fragment>

  );
})

export default ComboComponent;