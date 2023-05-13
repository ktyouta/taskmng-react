import React, { forwardRef, useState } from 'react';
import '../App.css';
import styled from "styled-components";


//引数の型
type propsType = {
  combo: comboType[],
  onChange?: (e: string) => void,
  initValue: string,
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
const BaseSelect = styled.select`
  text-align:center;
  width: 300px;
  min-width: 200px;
  height:45px;
  min-height:30px;
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
        <BaseSelect onChange={change} value={selectValue}>
          {
            props.combo.map((element) => {
              return (
                <option
                  value={element.value}
                  key={`${element.value}-${element.label}`}
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